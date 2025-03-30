import {
  bfsIdForPostalCode,
  bfsIdForPostalCodeAndCity,
  bfsIdsForPostalCode,
  getTaxLocations
} from '~/lib/taxes/location';
import { calculateTaxesIncomeAndFortune } from './income';
import { calculatePensionCapitalTaxes } from './pensionCapital';
import { TaxInput, TaxResult } from './typesClient';

export const calculateTaxes = async (taxInput: TaxInput): Promise<TaxResult> => {
  switch (taxInput.calculationType) {
    case 'incomeAndWealth':
      return await calculateTaxesIncomeAndFortune(taxInput);
    case 'capital':
      return await calculatePensionCapitalTaxes(taxInput);
  }

  throw new Error('Tax type not supported');
};

export const getBfsIdForPostalCode = async (postalCode: string, city: string, year:number) : Promise<number|null> => {
  return await bfsIdForPostalCode(postalCode, city, year);
};

export const getBfsIdsForPostalCode = async (postalCode: string, year:number) : Promise<number[]|null> => {
  return await bfsIdsForPostalCode(postalCode, year);
};

export const getBfsIdForPostalCodeAndCity = async (postalCode:string, city:string, year:number) => {
  return await bfsIdForPostalCodeAndCity(postalCode, city, year);
};


export const getTaxesLocationForYear = getTaxLocations;
