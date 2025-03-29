import {calculateTaxes} from "./bundle-test.js";

const message = await calculateTaxes({
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
  ],
  cantonId: 26
});
console.log("Laurent",message);
