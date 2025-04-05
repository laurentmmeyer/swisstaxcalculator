<template>
  <div class="w-full max-w-5xl mx-auto px-3 sm:px-8">
    <div class="mb-40">
      <h1 class="text-2xl mt-9 mb-4">{{ t('taxCalculatorTitle') }}</h1>
      <div class="flex flex-wrap justify-between gap-9">
        <!-- Left: Form -->
        <div class="max-w-sm">
          <FormKit v-model="defaultInput" type="form" :actions="false" @submit="submit">
            <div class="grid grid-cols-2 gap-4">
              <FormKit
                type="buttonSelect"
                :name="nameof<TaxInput>((x) => x.calculationType)"
                :label="t('taxTypeLabel')"
                :options="getOptions(taxInputData.calculationTypes)"
                orientation="row"
                option-label-classes="text-xs"
                outer-class="col-span-2"
              />
              <FormKit
                type="select"
                :name="nameof<TaxInput>((x) => x.year)"
                :options="taxInputData.years"
                :label="t('taxYearLabel')"
              />
              <FormKit
                type="autocomplete"
                :name="nameof<TaxInput>((x) => x.locationId)"
                :label="t('taxMunicipalityLabel')"
                :value="defaultInput.locationId"
                :options="taxLocations"
                outer-class="col-span-2"
                :filter-min-length="2"
              />
              <FormKit
                v-model="civilStatus"
                :name="nameof<TaxInput>((x) => x.relationship)"
                type="buttonSelect"
                :label="t('civilStatusLabel')"
                :options="getOptions(taxInputData.relationships)"
                outer-class="col-span-2"
                orientation="row"
                option-label-classes="text-xs"
              />
              <FormKit
                v-model="children"
                :label="t('numberOfChildrenLabel')"
                :name="nameof<TaxInput>((x) => x.children)"
                type="select"
                validation="required"
                :as-number="true"
                :options="childrenOptions"
                :step-next="true"
              />

              <FormKit type="list" :name="nameof<TaxInput>((x) => x.persons)">
                <FormKit v-for="person in personItems" :key="person" type="group">
                  <div v-if="showSecondPerson" class="col-start-1 col-span-2 p-1 text-sm font-medium text-normal-600 bg-normal-200 -mb-3">
                    {{ t('personLabel') }} {{ person }}
                  </div>
                  <FormKit
                    :key="person"
                    type="hidden"
                    :name="nameof<TaxInputPerson>((x) => x.incomeType)"
                    value="gross"
                  />
                  <FormKit
                    :key="person"
                    type="numberSuffix"
                    :suffix="t('yearsSuffix')"
                    :name="nameof<TaxInputPerson>((x) => x.age)"
                    :step="1"
                    :min="18"
                    :max="150"
                    :label="t('ageLabel')"
                    outer-class="col-start-1"
                  />
                  <FormKit
                    :key="person"
                    type="buttonSelect"
                    :name="nameof<TaxInputPerson>((x) => x.confession)"
                    validation-label="Konfession"
                    :options="getOptions(taxInputData.confessions)"
                    outer-class="col-span-2"
                    orientation="row"
                    option-label-classes="text-xs"
                  />

                  <FormKit
                    :key="person"
                    type="numberSuffix"
                    suffix="CHF"
                    :name="nameof<TaxInputPerson>((x) => x.income)"
                    :step="1"
                    :min="0"
                    :value="0"
                    :label="t('grossIncomeLabel')"
                  />

                  <FormKit
                    :key="person"
                    type="numberSuffix"
                    suffix="CHF"
                    :name="nameof<TaxInputPerson>((x) => x.pkDeduction)"
                    :step="1"
                    :min="0"
                    :max="10000"
                    :value="0"
                    :label="t('pkContributionLabel')"
                  />

                  <div class="col-start-1 col-span-2 text-sm font-medium text-normal-600 mt-1">
                    {{ t('deductionsLabel') }}
                  </div>

                  <TaxDeductions
                    :key="person"
                    class="col-span-2"
                    :deductions="taxInputData.deductionsPerson"
                    :children-count="children"
                  />
                </FormKit>
              </FormKit>
              <div v-if="showSecondPerson" class="col-start-1 col-span-2 p-1 text-sm font-medium text-normal-600 bg-normal-200 -mb-3">
                {{ t('jointLabel') }}
              </div>

              <div class="col-start-1 col-span-2 text-sm font-medium text-normal-600 mt-1">
                {{ t('additionalDeductionsLabel') }}
              </div>

              <TaxDeductions
                class="col-span-2"
                :deductions="taxInputData.deductionsGeneral"
                :children-count="children"
              />

              <FormKit
                type="numberSuffix"
                suffix="CHF"
                :name="nameof<TaxInput>((x) => x.fortune)"
                outer-class="col-start-1"
                :step="1"
                :min="0"
                :label="t('netWealthLabel')"
              />
              <GlobalButton type="submit" class="col-start-1">{{ t('calculateButton') }}</GlobalButton>
            </div>
          </FormKit>
        </div>
        <!-- Right: Results -->
        <div v-if="taxes" class="max-w-sm">
          <h3 class="text-lg leading-7">{{ t('resultTaxCalculationTitle') }}</h3>
          <div class="grid grid-cols-2 text-sm mt-4">
            <!-- Taxes canton -->
            <div class="font-medium">{{ t('cantonTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeCanton + taxes.taxesFortuneCanton) }}
            </div>

            <div>{{ t('incomeTaxLabel') }}</div>
            <div class="font-numerictab text-sm text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeCanton) }}
            </div>

            <div>{{ t('wealthTaxLabel') }}</div>
            <div class="font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesFortuneCanton) }}
            </div>
            <div class="col-span-2 mt-2 bg-normal-200 h-1.5">
              <div class="h-1.5 bg-primary-600" :style="{ width: `${((taxes.taxesIncomeCanton + taxes.taxesFortuneCanton) / taxes.taxesTotal) * 100}%` }" />
            </div>

            <!-- Taxes city -->
            <div class="col-span-2 mt-4"></div>
            <div class="font-medium">{{ t('cityTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeCity + taxes.taxesFortuneCity) }}
            </div>

            <div>{{ t('incomeTaxLabel') }}</div>
            <div class="font-numerictab text-sm text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeCity) }}
            </div>

            <div>{{ t('wealthTaxLabel') }}</div>
            <div class="font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesFortuneCity) }}
            </div>
            <div class="col-span-2 mt-2 bg-normal-200 h-1.5">
              <div class="h-1.5 bg-primary-600" :style="{ width: `${((taxes.taxesIncomeCity + taxes.taxesFortuneCity) / taxes.taxesTotal) * 100}%` }" />
            </div>

            <!-- Taxes Church -->
            <div class="col-span-2 mt-4"></div>
            <div class="font-medium">{{ t('churchTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeChurch + taxes.taxesFortuneChurch) }}
            </div>

            <div>{{ t('incomeTaxLabel') }}</div>
            <div class="font-numerictab text-sm text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeChurch) }}
            </div>

            <div>{{ t('wealthTaxLabel') }}</div>
            <div class="font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesFortuneChurch) }}
            </div>
            <div class="col-span-2 mt-2 bg-normal-200 h-1.5">
              <div class="h-1.5 bg-primary-600" :style="{ width: `${((taxes.taxesIncomeChurch + taxes.taxesFortuneChurch) / taxes.taxesTotal) * 100}%` }" />
            </div>

            <!-- Taxes person -->
            <div class="col-span-2 mt-4"></div>
            <div class="font-medium">{{ t('personalTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesPersonnel) }}
            </div>
            <div class="col-span-2 mt-2 bg-normal-200 h-1.5">
              <div class="h-1.5 bg-primary-600" :style="{ width: `${0 * 100}%` }" />
            </div>

            <!-- Taxes bund -->
            <div class="col-span-2 mt-4"></div>
            <div class="font-medium">{{ t('federalTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesIncomeBund) }}
            </div>
            <div class="col-span-2 mt-2 bg-normal-200 h-1.5">
              <div class="h-1.5 bg-primary-600" :style="{ width: `${(taxes.taxesIncomeBund / taxes.taxesTotal) * 100}%` }" />
            </div>

            <!-- Taxes total -->
            <div class="col-span-2 mt-4 border-t mb-4"></div>
            <div>{{ t('totalIncomeTaxLabel') }}</div>
            <div class="font-numerictab text-sm text-right">
              {{
                displayCurrencyShort(
                  taxes.taxesIncomeCity +
                  taxes.taxesIncomeCanton +
                  taxes.taxesIncomeChurch +
                  taxes.taxesIncomeBund
                )
              }}
            </div>

            <div>{{ t('totalWealthTaxLabel') }}</div>
            <div class="font-numerictab text-right">
              {{
                displayCurrencyShort(
                  taxes.taxesFortuneCity + taxes.taxesFortuneCanton + taxes.taxesFortuneChurch
                )
              }}
            </div>
            <div class="font-medium">{{ t('totalTaxLabel') }}</div>
            <div class="font-medium font-numerictab text-right">
              {{ displayCurrencyShort(taxes.taxesTotal) }}
            </div>
          </div>
        </div>

        <!-- Details Section -->
        <div v-if="taxes">
          <div class="max-w-2xl text-sm">
            <h3 class="text-lg leading-7">{{ t('detailsTaxCalculationTitle') }}</h3>
            <!-- Gross to net -->
            <table v-if="detailsGrossNet.length > 0" class="w-full font-numerictab border-spacing-y-2 border-separate">
              <tr class="bg-normal-200">
                <th class="w-auto text-left">{{ t('grossNetLabel') }}</th>
                <th class="w-32 text-right">P1</th>
                <th class="w-32 text-right"><span v-if="showSecondPerson">P2</span></th>
              </tr>
              <tr v-for="(item, index) in detailsGrossNet" :key="index" class="last:font-medium">
                <td>{{ item.label }}</td>
                <td class="text-right">{{ displayCurrency(item.p1) }}</td>
                <td class="text-right">
                  <span v-if="showSecondPerson">{{ displayCurrency(item.p2 ?? 0) }}</span>
                </td>
              </tr>
            </table>

            <!-- Deductions: Income -->
            <table class="w-full mt-9 border-spacing-y-2 border-separate">
              <thead>
              <tr class="bg-normal-200">
                <th class="w-auto text-left">{{ t('incomeLabel') }}</th>
                <th class="w-32 text-right">{{ t('cantonLabel') }}</th>
                <th class="w-32 text-right">{{ t('federalLabel') }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in detailsDeductionsIncome" :key="index" class="last:font-medium">
                <td>{{ item.label }}</td>
                <td class="text-right font-numerictab">{{ displayCurrency(item.canton) }}</td>
                <td class="text-right font-numerictab">{{ displayCurrency(item.bund) }}</td>
              </tr>
              </tbody>
            </table>

            <!-- Deductions: Fortune -->
            <table class="w-full mt-9 border-spacing-y-2 border-separate">
              <thead>
              <tr class="bg-normal-200">
                <th class="w-auto text-left">{{ t('fortuneLabel') }}</th>
                <th class="w-32 text-right">{{ t('cantonLabel') }}</th>
                <th class="w-32"></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in detailsDeductionsFortune" :key="index" class="last:font-medium">
                <td>{{ item.label }}</td>
                <td class="text-right font-numerictab">{{ displayCurrency(item.canton) }}</td>
                <td></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormKitNode } from '@formkit/core';
import { nameof } from 'ts-simple-nameof';
import { ref, computed } from 'vue';
import { taxInputData } from '~/lib/taxes/constants';
import { TaxInput, TaxRelationship, TaxResult, TaxInputPerson, ValueLabelItem } from '~/lib/taxes/typesClient';
import { childrenOptions } from '~~/lib/components/listOptions';
import { calculateTaxes, getBfsIdForPostalCode, getBfsIdsForPostalCode } from '~~/lib/taxes';
import { getTaxLocations } from '~~/lib/taxes/location';

const locale = ref(
  ["de", "fr", "it"].includes(navigator.language.slice(0, 2))
    ? navigator.language.slice(0, 2)
    : "en"
);

// Translation function: given a key, returns the translation for the current locale.
const t = (key: string): string => {
  const translations: Record<string, Record<string, string>> = {
    taxCalculatorTitle: {
      en: "Tax Calculator",
      de: "Steuerrechner",
      fr: "Calculateur d'impôts",
      it: "Calcolatore delle tasse"
    },
    taxTypeLabel: {
      en: "Tax Type",
      de: "Steuerart",
      fr: "Type d'impôt",
      it: "Tipo di tassa"
    },
    taxYearLabel: {
      en: "Tax Year",
      de: "Steuerjahr",
      fr: "Année fiscale",
      it: "Anno fiscale"
    },
    taxMunicipalityLabel: {
      en: "Tax Municipality",
      de: "Steuergemeinde",
      fr: "Commune fiscale",
      it: "Comune fiscale"
    },
    civilStatusLabel: {
      en: "Civil Status",
      de: "Zivilstand",
      fr: "État civil",
      it: "Stato civile"
    },
    numberOfChildrenLabel: {
      en: "Number of Children",
      de: "Anzahl Kinder",
      fr: "Nombre d'enfants",
      it: "Numero di figli"
    },
    personLabel: {
      en: "Person",
      de: "Person",
      fr: "Personne",
      it: "Persona"
    },
    yearsSuffix: {
      en: "years",
      de: "Jahre",
      fr: "ans",
      it: "anni"
    },
    ageLabel: {
      en: "Age",
      de: "Alter",
      fr: "Âge",
      it: "Età"
    },
    grossIncomeLabel: {
      en: "Gross Income",
      de: "Bruttoeinkommen",
      fr: "Revenu brut",
      it: "Reddito lordo"
    },
    pkContributionLabel: {
      en: "Pension Contribution",
      de: "PK-Beitrag Arbeitnehmer",
      fr: "Cotisation de pension",
      it: "Contributo pensionistico"
    },
    deductionsLabel: {
      en: "Deductions",
      de: "Abzüge",
      fr: "Déductions",
      it: "Deduzioni"
    },
    jointLabel: {
      en: "Joint",
      de: "Gemeinsam",
      fr: "En commun",
      it: "Comune"
    },
    additionalDeductionsLabel: {
      en: "Additional Deductions",
      de: "Weitere Abzüge",
      fr: "Déductions supplémentaires",
      it: "Deduzioni aggiuntive"
    },
    netWealthLabel: {
      en: "Net Wealth",
      de: "Reinvermögen",
      fr: "Fortune nette",
      it: "Patrimonio netto"
    },
    calculateButton: {
      en: "Calculate",
      de: "Berechnen",
      fr: "Calculer",
      it: "Calcola"
    },
    resultTaxCalculationTitle: {
      en: "Tax Calculation Result",
      de: "Resultat Steuerberechnung",
      fr: "Résultat du calcul fiscal",
      it: "Risultato del calcolo delle tasse"
    },
    cantonTaxLabel: {
      en: "Canton Tax",
      de: "Kantonssteuer",
      fr: "Impôt cantonal",
      it: "Tassa cantonale"
    },
    incomeTaxLabel: {
      en: "Income Tax",
      de: "Einkommenssteuer",
      fr: "Impôt sur le revenu",
      it: "Tassa sul reddito"
    },
    wealthTaxLabel: {
      en: "Wealth Tax",
      de: "Vermögenssteuer",
      fr: "Impôt sur la fortune",
      it: "Tassa sul patrimonio"
    },
    cityTaxLabel: {
      en: "Municipal Tax",
      de: "Gemeindesteuer",
      fr: "Impôt communal",
      it: "Tassa comunale"
    },
    churchTaxLabel: {
      en: "Church Tax",
      de: "Kirchensteuer",
      fr: "Impôt ecclésiastique",
      it: "Tassa ecclesiastica"
    },
    personalTaxLabel: {
      en: "Personal Tax",
      de: "Personalsteuer",
      fr: "Impôt personnel",
      it: "Tassa personale"
    },
    federalTaxLabel: {
      en: "Federal Tax",
      de: "Direkte Bundessteuer",
      fr: "Impôt fédéral direct",
      it: "Tassa federale diretta"
    },
    totalIncomeTaxLabel: {
      en: "Total Income Tax",
      de: "Total Einkommenssteuer",
      fr: "Total impôt sur le revenu",
      it: "Tassa totale sul reddito"
    },
    totalWealthTaxLabel: {
      en: "Total Wealth Tax",
      de: "Total Vermögenssteuer",
      fr: "Total impôt sur la fortune",
      it: "Tassa totale sul patrimonio"
    },
    totalTaxLabel: {
      en: "Total Taxes",
      de: "Total Steuern",
      fr: "Total des impôts",
      it: "Tasse totali"
    },
    detailsTaxCalculationTitle: {
      en: "Tax Calculation Details",
      de: "Details Steuerberechnung",
      fr: "Détails du calcul fiscal",
      it: "Dettagli del calcolo delle tasse"
    },
    grossNetLabel: {
      en: "Gross / Net Income",
      de: "Brutto- / Nettoeinkommen",
      fr: "Revenu brut / net",
      it: "Reddito lordo / netto"
    },
    incomeLabel: {
      en: "Income",
      de: "Einkommen",
      fr: "Revenu",
      it: "Reddito"
    },
    cantonLabel: {
      en: "Canton",
      de: "Kanton",
      fr: "Canton",
      it: "Cantone"
    },
    federalLabel: {
      en: "Federal",
      de: "Bund",
      fr: "Fédéral",
      it: "Federale"
    },
    fortuneLabel: {
      en: "Fortune",
      de: "Vermögen",
      fr: "Fortune",
      it: "Patrimonio"
    },
    taxableWealth: {
      en: "Taxable Wealth",
      de: "Steuerbares Vermögen",
      fr: "Fortune imposable",
      it: "Patrimonio imponibile"
    },
    netIncome: {
      en: "Net Income",
      de: "Nettoeinkommen",
      fr: "Revenu net",
      it: "Reddito netto"
    },
    netIncomeMainEmployment: {
      en: "Net Income Main Employment",
      de: "Nettoeinkommen Haupterwerb",
      fr: "Revenu net principal",
      it: "Reddito netto principale"
    },
    taxableIncome: {
      en: "Taxable Income",
      de: "Steuerbares Einkommen",
      fr: "Revenu imposable",
      it: "Reddito imponibile"
    },
    ahvIvEo: {
      en: "Social Security (AHV/IV/EO)",
      de: "AHV-, IV-, EO-Beiträge",
      fr: "Cotisations AVS/AI/APG",
      it: "Contributi AVS/AI/EO"
    },
    alv: {
      en: "Unemployment Insurance (ALV)",
      de: "ALV-Beiträge",
      fr: "Cotisations chômage (ALV)",
      it: "Contributi disoccupazione (ALV)"
    },
    nbu: {
      en: "Non-occupational Benefits (NBU)",
      de: "NBU-Beiträge",
      fr: "Cotisations NBU",
      it: "Contributi NBU"
    },
    pk: {
      en: "Pension Fund (PK)",
      de: "Pensionskassenbeiträge",
      fr: "Cotisations caisse de pension",
      it: "Contributi cassa pensione"
    }
  };
  try {
    console.log(translations[key][locale.value]);
  }catch (e){
    debugger;
  }
  return translations[key][locale.value];
};

const defaultInput = ref<Partial<TaxInput>>({
  calculationType: 'incomeAndWealth',
  children: 0,
  fortune: 250000,
  locationId: 66,
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
  ]
});

// Retrieve saved tax input from Chrome storage.
if (chrome.storage) {
  chrome.storage.sync.get('taxInput', (data: any) => {
    if (data && data.taxInput) {
      defaultInput.value = data.taxInput;
    }
  });
}

const getOptions = (list: readonly ValueLabelItem<string>[]) =>
  list.map((item) => ({ value: item.value, label: item.label[(locale.value as "fr"|"de"|"en"|"it")] }));

const taxLocationsResult = await getTaxLocations(2025);
const taxLocations = computed(
  () =>
    taxLocationsResult!.map((item) => ({
      value: item.BfsID,
      label: `${item.BfsName} (${item.Canton})`
    })) ?? []
);

const civilStatus = ref<TaxRelationship>();
const children = ref<number>();
const showSecondPerson = computed(() => civilStatus.value === 'm' || civilStatus.value === 'rp');
const personItems = computed(() => (showSecondPerson.value ? [1, 2] : [1]));

const taxes = ref<TaxResult>();

type GrossNetItem = { label: string; p1: number; p2?: number };
const detailsGrossNet = computed(() => {
  if (!taxes.value || !taxes.value.details.grossNetDetails) return [];
  const details: GrossNetItem[] = [];
  const grossP1 = taxes.value.details.grossNetDetails[0];
  const grossP2 = taxes.value.details.grossNetDetails.length > 1 ? taxes.value.details.grossNetDetails[1] : undefined;
  details.push({ label: t("grossIncomeLabel"), p1: grossP1.grossIncome, p2: grossP2?.grossIncome });
  details.push({ label: t("ahvIvEo"), p1: grossP1.ahvIvEo, p2: grossP2?.ahvIvEo });
  details.push({ label: t("alv"), p1: grossP1.alv, p2: grossP2?.alv });
  details.push({ label: t("nbu"), p1: grossP1.nbu, p2: grossP2?.nbu });
  details.push({ label: t("pk"), p1: grossP1.pk, p2: grossP2?.pk });
  details.push({ label: t("netIncome"), p1: grossP1.netIncome, p2: grossP2?.netIncome });
  return details;
});

type DeductionItem = { label: string; canton: number; bund: number };
const detailsDeductionsIncome = computed(() => {
  if (!taxes.value) return [];
  const details: DeductionItem[] = [];
  const deductionsIncome = taxes.value.details.deductionsIncome;
  details.push({
    label: t("netIncomeMainEmployment"),
    canton: taxes.value.details.netIncomeCanton,
    bund: taxes.value.details.netIncomeBund
  });
  deductionsIncome.forEach((deduction) => {
    details.push({
      label:
        deduction.label[locale.value as 'en'|'fr'|'it'|'de'] + (showSecondPerson.value && deduction.target ? ` ${deduction.target}` : ''),
      canton: deduction.amountCanton,
      bund: deduction.amountBund
    });
  });
  details.push({
    label: t("taxableIncome"),
    canton: taxes.value.details.taxableIncomeCanton,
    bund: taxes.value.details.taxableIncomeBund
  });
  return details;
});

const detailsDeductionsFortune = computed(() => {
  if (!taxes.value) return [];
  const details: DeductionItem[] = [];
  const deductionsFortune = taxes.value.details.deductionsFortune;
  details.push({
    label: t("netWealthLabel"),
    canton: taxes.value.input.fortune,
    bund: 0
  });
  deductionsFortune.forEach((deduction) => {
    details.push({
      label: deduction.name + (showSecondPerson.value ? deduction.target : ''),
      canton: deduction.amountCanton,
      bund: deduction.amountBund
    });
  });
  details.push({
    label: t("taxableWealth"),
    canton: taxes.value.details.taxableFortuneCanton,
    bund: 0
  });
  return details;
});

const submit = async (value: any, node?: FormKitNode) => {
  node?.setErrors([]);
  const taxInput: Partial<TaxInput> = {
    ...value,
    cantonId: taxLocationsResult?.find((x) => x.BfsID === value.locationId)?.CantonID
  };
  try {
    if (chrome.storage) {
      chrome.storage.sync.set({ taxInput }, function() {
        console.log("Saved:", JSON.stringify(taxInput));
      });
    }
    const result = await calculateTaxes(taxInput as TaxInput);
    taxes.value = result;
  } catch (error: any) {
    node?.setErrors(["Es ist ein unerwarteter Fehler aufgetreten.", error.message]);
    taxes.value = undefined;
  }
};
</script>
