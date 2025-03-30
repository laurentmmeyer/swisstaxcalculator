// content-script.js
import { calculateTaxes, getBfsIdForPostalCodeAndCity, getTaxesLocationForYear } from './taxlib.js';

function formatCHF(amount) {
  const formatter = new Intl.NumberFormat('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return `${formatter.format(amount)} CHF`;
}

console.log("SwissTaxCalculator", "module loaded");

const calculateTaxesOnPage = async () => {
  console.log("SwissTaxCalculator", "init");

  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("SwissTaxCalculator", "will start");

  try {
    // Find the element with itemtype="https://schema.org/Place"
    const placeElement = document.querySelector('[itemtype="https://schema.org/Place"]');
    if (!placeElement) {
      console.warn('Place element not found.');
      return;
    }

    // Extract text content from the place element
    const placeText = placeElement.textContent || '';

    // Find a 4-digit postal code after a comma and capture the city name that follows.
    const match = placeText.match(/,*\s*(\d{4})\s+(.+)/);
    if (!match) {
      console.warn('Postal code or city not found in the place element.');
      return;
    }
    const postalCode = match[1];
    const city = match[2].trim();
    console.log('Found postal code:', postalCode);
    console.log('Found city:', city);

    // Call the async calculation function
    const calculationResult = await calculateTaxesAsync(postalCode, city);
    console.log('Calculation result:', calculationResult);

    // Find the element with data-cy="price"
    const priceElement = document.querySelector('[data-cy="price"]');
    if (!priceElement) {
      console.warn('Price element not found.');
      return;
    }

    // Create the result HTML content
    const diff = calculationResult.new - calculationResult.old;
    const monthlyDiff = diff / 12;

    // Define pleasant colors
    const niceRed = "#d9534f";   // for increased taxes
    const niceGreen = "#5cb85c"; // for reduced taxes

    // Determine color based on the difference (default to inherit for zero)
    const diffColor = diff > 0 ? niceRed : diff < 0 ? niceGreen : 'inherit';

    // Prepend a plus sign if the difference is positive
    const formattedDiff = `${diff > 0 ? '+' : ''}${formatCHF(diff)}`;
    const formattedMonthlyDiff = `${monthlyDiff > 0 ? '+' : ''}${formatCHF(monthlyDiff)}`;

    // Build the inner HTML for the result element
    const resultHTML = `
      <div>
        Taxes per year: <span style="font-size: 1.2em;">${formatCHF(calculationResult.new)}</span>
      </div>
      <div>
        Difference with your current taxes: per year: <span style="color: ${diffColor};">${formattedDiff}</span>
        &mdash; per month: <span style="color: ${diffColor};">${formattedMonthlyDiff}</span>
      </div>
    `;

    // Check if the result element already exists
    let resultElement = document.getElementById("swiss-tax-calculator-result");
    if (resultElement) {
      // Replace its inner content
      resultElement.innerHTML = resultHTML;
    } else {
      // Create a new result element
      resultElement = document.createElement('div');
      resultElement.id = "swiss-tax-calculator-result";
      resultElement.style.marginTop = '5px';
      resultElement.style.fontWeight = 'bold';
      resultElement.className = 'formatted-value__value';
      resultElement.style.fontFamily = 'Arial, sans-serif';
      resultElement.style.fontSize = '0.8em';
      resultElement.innerHTML = resultHTML;

      // Insert the result element below the price element
      priceElement.insertAdjacentElement('afterend', resultElement);
    }

    console.log("SwissTaxCalculator", "injection complete");
  } catch (error) {
    console.error('Error in content script:', error);
  }
};

/*
 * Example async calculation function.
 * Replace or import your actual function.
 */
async function calculateTaxesAsync(postalCode, city) {
  console.log("SwissTaxCalculator", "calculate", postalCode);

  // ==== Test
  // const plz = "6340";
  // const city1 = "baar";
  // const city2 = "baar (zg)";
  // const city3 = "Neuheim";
  // const city4 = "Hausen am Albis ZH";
  // const city5 = "Horgen";
  // const bfsResolved = await getBfsIdForPostalCodeAndCity(plz, city1, 2025);
  // const bfsResolved2 = await getBfsIdForPostalCodeAndCity(plz, city2, 2025);
  // const bfsResolved3 = await getBfsIdForPostalCodeAndCity(plz, city3, 2025);
  // const bfsResolved4 = await getBfsIdForPostalCodeAndCity(plz, city4, 2025);
  // const bfsResolved5 = await getBfsIdForPostalCodeAndCity(plz, city5, 2025);
  // console.log("Expects 1701", bfsResolved);
  // console.log("Expects 1701", bfsResolved2);
  // console.log("Expects 1705", bfsResolved3);
  // console.log("Expects 4", bfsResolved4);
  // console.log("Expects 295", bfsResolved5);
  // ====


  const bfsId = await getBfsIdForPostalCodeAndCity(postalCode, city, 2025);
  const locations = await getTaxesLocationForYear(2025);
  const cantonId = locations?.find((x) => x.BfsID === bfsId)?.CantonID;

  const taxInput = await new Promise((resolve, reject) => {
    chrome.storage.sync.get('taxInput', (data) => {
      if (data && data.taxInput) {
        console.log("SwissTaxCalculator", "from saved data");
        resolve(data.taxInput);
      } else {
        console.log("SwissTaxCalculator", "no saved data");
        resolve({
          calculationType: 'incomeAndWealth',
          children: 0,
          fortune: 250000,
          locationId: bfsId,
          relationship: 's',
          year: 2025,
          persons: [
            {
              age: 30,
              confession: 'roman',
              income: 100000,
              incomeType: 'gross',
              pkDeduction: 5000
            }
          ],
          cantonId
        });
      }
    });
  });

  const oldTaxes = await calculateTaxes(taxInput);
  const newTaxes = await calculateTaxes({ ...taxInput, locationId: bfsId, cantonId });
  return { new: newTaxes.taxesTotal, old: oldTaxes.taxesTotal };
}

let lastUrl = location.href;
setInterval(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    lastUrl = currentUrl;
    console.log("SwissTaxCalculator", currentUrl);
    calculateTaxesOnPage();
  }
}, 500);

calculateTaxesOnPage();
