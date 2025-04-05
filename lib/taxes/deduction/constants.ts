import { TaxDeductionPersonFieldConfigs, TaxDeductionGeneralFieldConfigs } from '../typesClient';

export const maxSalaryNbuAlv = 148200;

export const taxDeductionsPerson: TaxDeductionPersonFieldConfigs = {
  insurancePremiums: {
    label: {
      de: 'Versicherungsprämien und Zinsen von Sparkapitalien',
      en: 'Insurance premiums and interest on savings capital',
      fr: "Primes d'assurance et intérêts sur le capital d'épargne",
      it: 'Premi assicurativi e interessi sul capitale di risparmio'
    },
    hint: {
      de: "Versicherungsprämien und Zinsen von Sparkapitalien, abzüglich individuelle Prämienverbilligung. Annahme: 4'560 CHF pro Erwachsenen (380 CHF monatlich)",
      en: 'Insurance premiums and interest on savings capital, minus individual premium reductions. Assumption: CHF 4,560 per adult (CHF 380 per month)',
      fr: "Primes d'assurance et intérêts sur le capital d'épargne, déduction faite des réductions individuelles de prime. Hypothèse : 4'560 CHF par adulte (380 CHF par mois)",
      it: 'Premi assicurativi e interessi sul capitale di risparmio, al netto delle riduzioni individuali dei premi. Assunzione: CHF 4.560 per adulto (CHF 380 al mese)'
    },
    default: 4560
  },
  pillar3a: {
    label: {
      de: 'Beiträge an Säule 3a',
      en: 'Contributions to Pillar 3a',
      fr: 'Cotisations au pilier 3a',
      it: 'Contributi al pilastro 3a'
    }
  },
  mealCosts: {
    label: {
      de: 'Verpflegungskosten',
      en: 'Meal costs',
      fr: 'Frais de restauration',
      it: 'Costi alimentari'
    },
    default: 1600,
    suggestion: 3200,
    dependsOnWorkloadFactor: true
  },
  travelExpenses: {
    label: {
      de: 'Fahrkosten',
      en: 'Travel expenses',
      fr: 'Frais de déplacement',
      it: 'Spese di viaggio'
    },
    default: 1000
  },
  otherProfessionalExpenses: {
    label: {
      de: 'Berufsauslagen',
      en: 'Professional expenses',
      fr: 'Frais professionnels',
      it: 'Spese professionali'
    },
    defaultFlatRate: true
  },
  professionalExpensesSideline: {
    label: {
      de: 'Berufsauslagen Nebenerwerb',
      en: 'Side job professional expenses',
      fr: 'Frais professionnels secondaires',
      it: 'Spese professionali per attività secondaria'
    }
  },
  otherDeductions: {
    label: {
      de: 'Übrige Abzüge',
      en: 'Other deductions',
      fr: 'Autres déductions',
      it: 'Altre detrazioni'
    }
  }
};

export const taxDeductionsGeneral: TaxDeductionGeneralFieldConfigs = {
  insurancePremiumsKids: {
    label: {
      de: 'Versicherungsprämien Kinder',
      en: 'Insurance premiums for children',
      fr: "Primes d'assurance pour enfants",
      it: 'Premi assicurativi per bambini'
    },
    withChildrenOnly: true,
    defaultPerChild: 1200
  },
  childcareCosts: {
    label: {
      de: 'Kinder Drittbetreuungskosten',
      en: 'Childcare costs (external)',
      fr: "Frais de garde d'enfants",
      it: 'Costi di assistenza per bambini'
    },
    withChildrenOnly: true
  },
  debtInterest: {
    label: {
      de: 'Schuldzinsen',
      en: 'Interest on debts',
      fr: 'Intérêts sur les dettes',
      it: 'Interessi sui debiti'
    }
  },
  maintenanceCostsRealEstate: {
    label: {
      de: 'Unterhaltskosten für Liegenschaften',
      en: 'Maintenance costs for properties',
      fr: 'Coûts d’entretien des biens immobiliers',
      it: 'Costi di manutenzione degli immobili'
    }
  },
  otherDeductions: {
    label: {
      de: 'Übrige Abzüge',
      en: 'Other deductions',
      fr: 'Autres déductions',
      it: 'Altre detrazioni'
    }
  }
};
