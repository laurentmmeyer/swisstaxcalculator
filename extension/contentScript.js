// content-script.js
import { calculateTaxes, getBfsIdForPostalCodeAndCity, getTaxesLocationForYear } from './taxlib.js';

// --- Configuration ---
// Define selectors and extraction logic for different websites.
// Add entries for each supported hostname.
const siteConfigs = {
  'www.newhome.ch': {
    placeSelector: '[itemtype="https://schema.org/Place"]',
    priceSelector: '[data-cy="price"]',
    // Regex to find a 4-digit postal code (group 1) and the city name (group 2)
    locationRegex: /\s*(\d{4})\s+(.+)/,
    resultElementId: 'swiss-tax-calculator-result', // ID for the injected element
    resultContainerClass: 'formatted-value__value', // Class to mimic existing styles
    insertResult: true // Flag to indicate insertion point relative to price element
  },
  'www.immoscout24.ch': {
    // Selector for the element containing "PostalCode City" (e.g., <span>3960 Sierre</span>)
    placeSelector: 'address > span:last-child',
    priceSelector: 'div.spotlight-components > h1',
    // Regex for text like "3960 Sierre"
    locationRegex: /^(\d{4})\s+(.+)$/,
    resultElementId: 'immoscout-tax-calculator-result',
    resultContainerClass: '',
    insertResult: true // Flag to indicate insertion point relative to price element
  },
  'www.homegate.ch': {
    // Selector for the element containing "PostalCode City" (e.g., <span>3960 Sierre</span>)
    placeSelector: 'address > span:last-child',
    priceSelector: 'div.spotlight-components > h1',
    // Regex for text like "3960 Sierre"
    locationRegex: /^(\d{4})\s+(.+)$/,
    resultElementId: 'immoscout-tax-calculator-result',
    resultContainerClass: '',
    insertResult: true // Flag to indicate insertion point relative to price element
  },
  'flatfox.ch': {
    // Selector for the element containing "PostalCode City" (e.g., <span>3960 Sierre</span>)
    placeSelector: '.widget-listing-title h2',
    priceSelector: '.widget-listing-title',
    // Regex for text like "3960 Sierre"
    locationRegex: /(?:,\s*|^)\s*(\d{4})\s+([^-]+)/,
    resultElementId: 'flatfox-tax-calculator-result',
    resultContainerClass: '',
    insertResult: true // Flag to indicate insertion point relative to price element
  },
  'www.properstar.com': {
    // Selector for the element containing "PostalCode City" (e.g., <span>3960 Sierre</span>)
    placeSelector: '.item-info-address-inner-address',
    priceSelector: '.listing-price-main',
    locationRegex: /(?:,\s*|^)\s*(\d{4})\s+([^-]+)/,
    resultElementId: 'properstar-tax-calculator-result',
    resultContainerClass: '',
    insertResult: true // Flag to indicate insertion point relative to price element
  },
  'www.comparis.ch': {
    placeSelector: 'span:has(> svg[data-icon="location-dot"]) + div > p:first-of-type',
    priceSelector: 'span:has(> svg[data-icon="location-dot"]) + div',
    locationRegex: /(?:,\s*|^)\s*(\d{4})\s+([^-]+)/,
    resultElementId: 'comparis-tax-calculator-result',
    resultContainerClass: '',
    insertResult: () => document.querySelector('span:has(> svg[data-icon="location-dot"]) + div > p:first-of-type').parentElement.parentElement.parentElement
  },
  // --- Example for another site (replace with actual selectors/logic) ---
  // 'www.example-immo-site.com': {
  //   placeSelector: '.address-details',
  //   priceSelector: '.price-tag .amount',
  //   locationRegex: /(\d{4})\s+([A-Za-z\s]+)$/, // Different regex example
  //   resultElementId: 'tax-calc-result-example',
  //   resultContainerClass: 'price-breakdown__item',
  //   insertResult: true
  // },
  'default': {
    // Optional: Define default behavior or leave empty to do nothing on unsupported sites
    logUnsupported: true // Example flag to log if a site isn't explicitly configured
  }
};

// --- Utility Functions ---

/**
 * Formats a number as Swiss Francs (CHF).
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted currency string.
 */
function formatCHF(amount) {
  const formatter = new Intl.NumberFormat('de-CH', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
  // Use non-breaking space for currency symbol if desired: '\u00A0CHF'
  return `${formatter.format(amount)} CHF`;
}

/**
 * Gets the configuration object for the current website's hostname.
 * @returns {object | null} The configuration object or null if not found.
 */
function getConfigForCurrentHost() {
  const hostname = window.location.hostname;
  const config = siteConfigs[hostname] || siteConfigs['default'] || null;
  if (config?.logUnsupported && !siteConfigs[hostname]) {
    console.log(`SwissTaxCalculator: No specific configuration for host "${hostname}". Using default.`);
  } else if (!config) {
    console.log(`SwissTaxCalculator: No configuration found for host "${hostname}".`);
  }
  return config;
}

/**
 * Finds a DOM element using a selector.
 * @param {string} selector - The CSS selector.
 * @param {string} description - A description of the element for logging.
 * @returns {Element | null} The found element or null.
 */
function findElement(selector, description) {
  if (!selector) {
    console.warn(`SwissTaxCalculator: No selector provided for ${description}.`);
    return null;
  }
  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`SwissTaxCalculator: ${description} element not found using selector: ${selector}`);
  }
  return element;
}

/**
 * Extracts postal code and city from a given element based on config.
 * @param {Element} placeElement - The DOM element containing the location info.
 * @param {object} config - The site-specific configuration object.
 * @returns {{postalCode: string, city: string} | null} Extracted info or null.
 */
function extractLocationInfo(placeElement, config) {
  if (!placeElement || !config.locationRegex) {
    console.warn('SwissTaxCalculator: Place element or location regex missing in config.');
    return null;
  }

  const placeText = placeElement.textContent || '';
  const match = placeText.match(config.locationRegex);

  if (!match || match.length < 3) { // Ensure both capturing groups are present
    console.warn('SwissTaxCalculator: Postal code or city not found in place element using regex:', config.locationRegex.toString());
    return null;
  }

  const postalCode = match[1];
  const city = match[2].trim();

  // Basic validation
  if (!/^\d{4}$/.test(postalCode) || !city) {
    console.warn(`SwissTaxCalculator: Extracted invalid data. Postal Code: "${postalCode}", City: "${city}"`);
    return null;
  }


  console.log('SwissTaxCalculator: Found Postal Code:', postalCode);
  console.log('SwissTaxCalculator: Found City:', city);
  return { postalCode, city };
}

/**
 * Calculates taxes asynchronously based on location and stored user input.
 * @param {string} postalCode - The postal code of the new location.
 * @param {string} city - The city name of the new location.
 * @returns {Promise<{new: number, old: number} | null>} Object with new and old taxes, or null on failure.
 */
async function calculateTaxesAsync(postalCode, city) {
  console.log("SwissTaxCalculator: Calculating taxes for", postalCode, city);

  try {
    const year = 2025; // Or dynamically determine the relevant year
    const bfsId = await getBfsIdForPostalCodeAndCity(postalCode, city, year);
    if (!bfsId) {
      console.error(`SwissTaxCalculator: Could not resolve BfsID for ${postalCode} ${city}`);
      return null;
    }

    const locations = await getTaxesLocationForYear(year);
    if (!locations) {
      console.error(`SwissTaxCalculator: Could not fetch locations for year ${year}`);
      return null;
    }
    const cantonId = locations.find((x) => x.BfsID === bfsId)?.CantonID;
    if (!cantonId) {
      console.error(`SwissTaxCalculator: Could not determine CantonID for BfsID ${bfsId}`);
      return null;
    }


    // Retrieve stored tax input or use defaults
    const taxInput = await new Promise((resolve) => {
      chrome.storage.sync.get('taxInput', (data) => {
        if (chrome.runtime.lastError) {
          console.error("SwissTaxCalculator: Error retrieving taxInput from storage:", chrome.runtime.lastError);
          // Resolve with defaults even on error to potentially proceed
        }
        if (data?.taxInput) {
          console.log("SwissTaxCalculator: Using saved tax input data.");
          resolve(data.taxInput);
        } else {
          console.log("SwissTaxCalculator: No saved tax input data found, using defaults.");
          resolve({
            calculationType: 'incomeAndWealth',
            children: 0,
            fortune: 250000,
            // locationId will be set below for 'old' calculation
            relationship: 's',
            year: year,
            persons: [{
              age: 30,
              confession: 'roman', // Consider making confession configurable or using 'other'/'none'
              income: 100000,
              incomeType: 'gross',
              pkDeduction: 5000
            }],
            // cantonId will be set below for 'old' calculation
          });
        }
      });
    });

    // Ensure the retrieved/default input has a year consistent with calculations
    taxInput.year = year;

    // Calculate taxes for the 'old' location (from stored input)
    // Need to ensure the stored input has valid locationId and cantonId
    let oldTaxesResult = null;
    if (taxInput.locationId && taxInput.cantonId) {
      oldTaxesResult = await calculateTaxes(taxInput);
    } else {
      console.warn("SwissTaxCalculator: Stored tax input missing locationId or cantonId. Cannot calculate 'old' taxes accurately.");
      // Assign a default or skip 'old' calculation? For now, let it proceed, resulting in null/0 difference later.
    }


    // Calculate taxes for the 'new' location (found on the page)
    const newTaxInput = { ...taxInput, locationId: bfsId, cantonId: cantonId };
    const newTaxesResult = await calculateTaxes(newTaxInput);

    if (!newTaxesResult) {
      console.error("SwissTaxCalculator: Failed to calculate 'new' taxes.");
      return null;
    }

    return {
      new: newTaxesResult.taxesTotal,
      old: oldTaxesResult?.taxesTotal ?? 0 // Default old taxes to 0 if calculation failed or wasn't possible
    };

  } catch (error) {
    console.error('SwissTaxCalculator: Error during tax calculation:', error);
    return null;
  }
}

/**
 * Displays the calculated tax results on the page.
 * @param {Element} anchorElement - The element to insert results relative to (e.g., price element).
 * @param {{new: number, old: number}} calculationResult - The calculated tax amounts.
 * @param {object} config - The site-specific configuration object.
 */
function displayTaxResults(anchorElement, calculationResult, config) {
  if (!anchorElement || !calculationResult || !config) {
    console.warn("SwissTaxCalculator: Cannot display results - missing element, data, or config.");
    return;
  }

  const { new: newTax, old: oldTax } = calculationResult;
  const diff = newTax - oldTax;
  const monthlyDiff = diff / 12;

  // Define pleasant colors
  const niceRed = "#d9534f";   // for increased taxes
  const niceGreen = "#5cb85c"; // for reduced taxes
  const neutralColor = "#555"; // for no change or if old tax was unknown

  // Determine color based on the difference
  let diffColor = neutralColor;
  if (oldTax > 0) { // Only show color difference if old tax was known
    diffColor = diff > 0 ? niceRed : diff < 0 ? niceGreen : neutralColor;
  }

  const formattedNewTax = formatCHF(newTax);
  const formattedDiff = `${diff > 0 ? '+' : ''}${formatCHF(diff)}`;
  const formattedMonthlyDiff = `${monthlyDiff > 0 ? '+' : ''}${formatCHF(Math.round(monthlyDiff))}`; // Round monthly diff

  // Build the inner HTML for the result element
  // Added a check to show difference only if oldTax was available
  const resultHTML = `
        <div>
          Est. Taxes / Year: <span style="font-size: 1.1em;">${formattedNewTax}</span>
        </div>
        ${oldTax > 0 ? `
        <div>
          Difference: <span style="color: ${diffColor};">${formattedDiff}</span> p.a.
          (<span style="color: ${diffColor};">${formattedMonthlyDiff}</span> p.m.)
        </div>` : `
         <div>(Set your current location in extension options to see the difference)</div>
        `}
    `;

  // Find or create the result element
  let resultElement = document.getElementById(config.resultElementId);
  if (resultElement) {
    // Update existing element
    resultElement.innerHTML = resultHTML;
    console.log("SwissTaxCalculator: Updated existing result element.");
  } else {
    // Create and insert new element
    resultElement = document.createElement('div');
    resultElement.id = config.resultElementId;
    resultElement.style.marginTop = '8px'; // Adjusted margin
    resultElement.style.marginBottom = '5px';
    resultElement.style.padding = '5px';
    resultElement.style.border = '1px solid #eee';
    resultElement.style.borderRadius = '4px';
    resultElement.style.backgroundColor = '#f9f9f9';
    resultElement.style.fontWeight = 'normal'; // Changed from bold
    if (config.resultContainerClass) {
      // Try to apply a class for consistency, but keep base styles as fallback
      resultElement.className = config.resultContainerClass;
      resultElement.style.fontWeight = 'bold'; // Re-apply bold if using the original class
    }
    // Apply base font styles if class doesn't cover it
    resultElement.style.fontFamily = resultElement.style.fontFamily || 'Arial, sans-serif';
    resultElement.style.fontSize = resultElement.style.fontSize || '0.85em'; // Slightly larger
    resultElement.style.lineHeight = '1.4';
    resultElement.innerHTML = resultHTML;

    // Insert the element - currently configured to go after the price element
    if (typeof config.insertResult !== 'function') {
      anchorElement.insertAdjacentElement('afterend', resultElement);
      console.log("SwissTaxCalculator: Inserted new result element after anchor.");
    } else {
      debugger;
      const anchor = config.insertResult();
      anchor.insertAdjacentElement('afterend', resultElement);
      console.log("SwissTaxCalculator: Inserted new result element after dynamic anchor.");
    }
  }
}


// --- Main Execution Logic ---

/**
 * Main function to find location, calculate taxes, and display results.
 */
async function runTaxCalculator() {
  console.log("SwissTaxCalculator: Script activated on", window.location.hostname);
  const config = getConfigForCurrentHost();

  // Stop if no valid config or essential selectors are missing
  if (!config || !config.placeSelector || !config.priceSelector || !config.locationRegex) {
    console.log("SwissTaxCalculator: Incomplete or missing configuration for this site. Exiting.");
    return;
  }

  // Optional: Delay to wait for dynamic content loading. Consider MutationObserver for robustness.
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("SwissTaxCalculator: Delay finished, attempting to find elements.");

  try {
    // 1. Find the location element
    const placeElement = findElement(config.placeSelector, 'Place');
    if (!placeElement) return;

    // 2. Extract Postal Code and City
    const locationInfo = extractLocationInfo(placeElement, config);
    if (!locationInfo) return;

    // 3. Calculate Taxes
    const calculationResult = await calculateTaxesAsync(locationInfo.postalCode, locationInfo.city);
    if (!calculationResult) {
      console.warn("SwissTaxCalculator: Tax calculation failed or returned no result.");
      return;
    }
    console.log('SwissTaxCalculator: Calculation result:', calculationResult);

    // 4. Find the price/anchor element for displaying results
    const priceElement = findElement(config.priceSelector, 'Price/Anchor');
    if (!priceElement) return;

    // 5. Display the results
    displayTaxResults(priceElement, calculationResult, config);

    console.log("SwissTaxCalculator: Processing finished successfully.");

  } catch (error) {
    console.error('SwissTaxCalculator: Error during main execution:', error);
  }
}

// --- Initialization and URL Change Monitoring ---

let lastUrl = location.href;

// Run the calculator when the script loads
runTaxCalculator();

// Set up an interval to re-run the calculator if the URL changes (for Single Page Applications)
setInterval(() => {
  const currentUrl = location.href;
  if (currentUrl !== lastUrl) {
    console.log("SwissTaxCalculator: URL changed detected.", currentUrl);
    lastUrl = currentUrl;
    // Optional: Add a small delay before running again on URL change
    // setTimeout(runTaxCalculator, 500);
    runTaxCalculator();
  }
}, 500); // Check every 500ms

console.log("SwissTaxCalculator: Content script loaded and monitoring initialized.");
