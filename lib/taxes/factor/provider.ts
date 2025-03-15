import { readFile } from '~~/lib/utils/filemocker';
import { TaxFactors } from './types';
import { dataParsedBasePath } from '../constants';
import { TaxInput } from '../typesClient';

const taxFactorsByYearCantonAndCity = new Map<number, Map<number, Map<number, TaxFactors>>>();

const loadFactorsIfRequired = async (cantonId: number, year: number) => {
  let factorsByCantonAndCity = taxFactorsByYearCantonAndCity.get(year);
  let factorsByCity = factorsByCantonAndCity?.get(cantonId);
  if (factorsByCity) return;

  // Load factors from file
  const filePath = `${dataParsedBasePath}${year}/factors/${cantonId}.json`;

  // Use our environment-aware readFile helper.
  const fileContents = await readFile(filePath);
  const factors: TaxFactors[] = JSON.parse(fileContents);

  // Create collections
  if (!factorsByCantonAndCity) {
    factorsByCantonAndCity = new Map();
    taxFactorsByYearCantonAndCity.set(year, factorsByCantonAndCity);
  }
  factorsByCity = new Map();

  // Import factors
  factors.forEach((factor) => {
    if (!factorsByCity) throw new Error('factorsByCity is undefined');

    const factorExisting = factorsByCity.get(factor.Location.BfsID);

    if (!factorExisting) {
      factorsByCity.set(factor.Location.BfsID, factor);
    }
  });

  // Set collection after importing successfully
  factorsByCantonAndCity.set(cantonId, factorsByCity);
};

export const getTaxFactors = async (taxInput: TaxInput) => {
  await loadFactorsIfRequired(taxInput.cantonId, taxInput.year);
  const factor = taxFactorsByYearCantonAndCity
    .get(taxInput.year)
    ?.get(taxInput.cantonId)
    ?.get(taxInput.locationId);
  if (!factor)
    throw new Error(
      `Factor not found for canton: ${taxInput.cantonId}, year: ${taxInput.year}, city: ${taxInput.locationId}`
    );
  return factor;
};
