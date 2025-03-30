// content-script.js
import { calculateTaxes, getBfsIdsForPostalCode, getTaxesLocationForYear } from './taxlib.js';

function formatCHF(amount) {
  const formatter = new Intl.NumberFormat('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  return `${formatter.format(amount)} CHF`;
}


console.log("SwissTaxCalculator", "module loaded");
(async () => {
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

      // Find a 4-digit postal code after a comma (e.g. ", 1234")
      const postalCodeMatch = placeText.match(/,*\s*(\d{4})/);
      if (!postalCodeMatch) {
        console.warn('Postal code not found in the place element.');
        return;
      }
      const postalCode = postalCodeMatch[1];
      console.log('Found postal code:', postalCode);

      // Call the async calculation function (implement or import it as needed)
      const calculationResult = await calculateTaxesAsync(postalCode);
      console.log('Calculation result:', calculationResult);

      // Find the element with data-cy="price"
      const priceElement = document.querySelector('[data-cy="price"]');
      if (!priceElement) {
        console.warn('Price element not found.');
        return;
      }

      // Create a new element to display the result
      const resultElement = document.createElement('div');
      resultElement.textContent = `Taxes per year: ${formatCHF(calculationResult.new)} (diff: ${formatCHF(calculationResult.new-calculationResult.old)} - per month (${formatCHF((calculationResult.new-calculationResult.old)/12)}))`;
      resultElement.style.marginTop = '10px';
      resultElement.style.fontWeight = 'bold';
      console.log("SwissTaxCalculator", "before injection");
      // Insert the result below the price element
      priceElement.insertAdjacentElement('afterend', resultElement);
      console.log("SwissTaxCalculator", "after injection");
    } catch (error) {
      console.error('Error in content script:', error);
    }
})();

/*
 * Example async calculation function.
 * Replace or import your actual function.
 */
async function calculateTaxesAsync(postalCode) {

  console.log("SwissTaxCalculator", "calculate", postalCode);
  const bfsIds = await getBfsIdsForPostalCode(postalCode, 2025);
  const bfsId = bfsIds[0];
  const locations = await getTaxesLocationForYear(2025);
  const cantonId = locations?.find((x) => x.BfsID === bfsId)?.CantonID;


  const taxInput  = await new Promise((resolve, reject)=> {
    chrome.storage.sync.get('taxInput', (data) => {
      if (data && data.taxInput) {
        console.log("SwissTaxCalculator", "from saved data");
        resolve(data.taxInput);
      }
      else{
        console.log("SwissTaxCalculator", "no saved data");
        resolve({
          calculationType: 'incomeAndWealth',
          children: 0,
          fortune: 250000,
          locationId: bfsId,
          relationship: 's',
          year: 2022,
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

  return {new: newTaxes.taxesTotal, old: oldTaxes.taxesTotal};
}
