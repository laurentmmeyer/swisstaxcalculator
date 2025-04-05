import { taxDeductionsGeneral, taxDeductionsPerson } from './deduction/constants';
import {
  TaxCalculationTypeList,
  TaxConfessionList,
  TaxIncomeTypeList,
  TaxInputData,
  TaxRelationshipList
} from './typesClient';

export const dataParsedRelativePath = 'data/parsed/';
export const dataParsedBasePath = `./${dataParsedRelativePath}`;
export const dataRawBasePath = './data/raw/';

export const taxCalculationTypes: TaxCalculationTypeList = [
  {
    value: 'incomeAndWealth',
    label: {
      de: 'Einkommens- und Vermögenssteuer',
      en: 'Income and Wealth Tax',
      fr: 'Impôt sur le revenu et la fortune',
      it: 'Imposta su reddito e patrimonio'
    }
  },
  {
    value: 'capital',
    label: {
      de: 'Vorsorge Kapitalsteuer',
      en: 'Pension Capital Tax',
      fr: 'Impôt sur le capital de prévoyance',
      it: 'Imposta sul capitale previdenziale'
    }
  }
] as const;

export const taxRelationships: TaxRelationshipList = [
  {
    value: 's',
    label: {
      de: 'Alleinstehend',
      en: 'Single',
      fr: 'Célibataire',
      it: 'Single'
    }
  },
  {
    value: 'm',
    label: {
      de: 'Verheiratet',
      en: 'Married',
      fr: 'Marié(e)',
      it: 'Sposato/a'
    }
  },
  {
    value: 'rp',
    label: {
      de: 'Eingetragene Partnerschaft',
      en: 'Registered Partnership',
      fr: 'Partenariat enregistré',
      it: 'Unione registrata'
    }
  },
  {
    value: 'c',
    label: {
      de: 'Konkubinat',
      en: 'Cohabitation',
      fr: 'Concubinage',
      it: 'Convivenza'
    }
  }
] as const;

export const taxConfessions: TaxConfessionList = [
  {
    value: 'christ',
    label: {
      de: 'Christkatholisch',
      en: 'Christian Catholic',
      fr: 'Catholique chrétien',
      it: 'Cristo-cattolico'
    }
  },
  {
    value: 'roman',
    label: {
      de: 'Römisch-katholisch',
      en: 'Roman Catholic',
      fr: 'Catholique romain',
      it: 'Romano cattolico'
    }
  },
  {
    value: 'protestant',
    label: {
      de: 'Reformiert',
      en: 'Reformed',
      fr: 'Réformé',
      it: 'Riformato'
    }
  },
  {
    value: 'other',
    label: {
      de: 'Andere / Keine',
      en: 'Other / None',
      fr: 'Autre / Aucun',
      it: 'Altro / Nessuno'
    }
  }
] as const;

export const taxIncomeTypes: TaxIncomeTypeList = [
  {
    value: 'gross',
    label: {
      de: 'Brutto',
      en: 'Gross',
      fr: 'Brut',
      it: 'Lordo'
    }
  },
  {
    value: 'net',
    label: {
      de: 'Netto',
      en: 'Net',
      fr: 'Net',
      it: 'Netto'
    }
  },
  {
    value: 'taxable',
    label: {
      de: 'Steuerpflichtig',
      en: 'Taxable',
      fr: 'Imposable',
      it: 'Imponibile'
    }
  }
] as const;

export const taxInputData: TaxInputData = {
  calculationTypes: taxCalculationTypes,
  years: [2022, 2024, 2025],
  relationships: taxRelationships,
  confessions: taxConfessions,
  incomeTypes: taxIncomeTypes,
  deductionsGeneral: taxDeductionsGeneral,
  deductionsPerson: taxDeductionsPerson
};
