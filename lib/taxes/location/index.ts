import { stringSimilarity } from "string-similarity-js";
import { readFile } from '~~/lib/utils/filemocker';
import { dataParsedBasePath } from '../constants';
import { TaxLocation } from '../typesClient';

const locationsByYearAndCity = new Map<number, Map<number, TaxLocation>>();

const locationsByYear = new Map<number, TaxLocation[]>();

const loadLocationsIfRequired = async (year: number) => {
  if (locationsByYearAndCity.has(year)) return;

  // Load locations from file
  const filePath = `${dataParsedBasePath}${year}/locations.json`;
  const fileContents = await readFile(filePath);
  const locations: TaxLocation[] = JSON.parse(fileContents);

  const locationsByCity = new Map<number, TaxLocation>();
  locationsByYearAndCity.set(year, locationsByCity);

  locations.forEach((location) => {
    locationsByCity.set(location.BfsID, location);
  });

  locationsByYear.set(year, locations);
};

export const getCantonIdByCityId = async (cityId: number, year: number) => {
  await loadLocationsIfRequired(year);
  const location = locationsByYearAndCity.get(year)?.get(cityId);
  if (!location) throw new Error(`Location not found for ${cityId}, ${year}`);
  return location.CantonID;
};

export const getTaxLocations = async (year: number) => {
  await loadLocationsIfRequired(year);
  return locationsByYear.get(year);
};

export const bfsIdForPostalCode = async (postalCode: string, city: string, year: number): Promise<number|null> => {
  await loadLocationsIfRequired(year);
  const locations = locationsByYear.get(year);

  if (locations) {
    for (const location of locations) {
      const matchingZipCode = location.ZipCodes.find(
        zipCode => zipCode.postalCode === postalCode && zipCode.city === city
      );
      if (matchingZipCode) {
        return location.BfsID;
      }
    }
  }

  return null;
};

export const bfsIdsForPostalCode = async (postalCode: string, year: number): Promise<number[] | null> => {
  await loadLocationsIfRequired(year);
  const locations = locationsByYear.get(year);

  if (locations) {
    const matchingBfsIds: number[] = [];

    for (const location of locations) {
      const matchingZipCode = location.ZipCodes?.find(
        zipCode => zipCode.postalCode === postalCode
      );
      if (matchingZipCode) {
        matchingBfsIds.push(location.BfsID);
      }
    }

    return matchingBfsIds.length > 0 ? matchingBfsIds : null;
  }

  return null;
};

export async function bfsIdForPostalCodeAndCity(
  postalCode: string,
  city: string,
  year: number
): Promise<number | null> {
  // Ensure the locations for the specified year are loaded.
  await loadLocationsIfRequired(year);
  const locations = locationsByYear.get(year);
  if (!locations) {
    return null;
  }

  let bestSimilarity = 0;
  let bestBfsId: number | null = null;

  // Iterate over each location
  for (const location of locations) {
    // Check if any zip code in the location matches the given postal code.
    const matchingZip = location.ZipCodes?.find(z => z.postalCode === postalCode);
    if (matchingZip) {
      // Use the city from the matching zip entry for similarity comparison.
      const similarity = stringSimilarity(
        city.toLowerCase(),
        matchingZip.city.toLowerCase()
      );
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity;
        bestBfsId = location.BfsID;
      }
    }
  }

  return bestBfsId;
}
