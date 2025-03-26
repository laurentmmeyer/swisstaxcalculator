import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { dataParsedBasePath, dataRawBasePath } from '../constants';

// Define the structure of the CSV row
interface CsvRow {
  'BFS-Nr': string;
  PLZ: string;
  Gemeindename: string;
}

export const importAndParsePostalCodes = () => {
  // Initialize an object to hold the grouped data
  const plzToBfs: { [key: string]: { [key: string]: number } } = {};
  const resolvedPath = path.resolve(`${dataRawBasePath}/AMTOVZ_CSV_LV95.csv`);

  // Read the CSV file and process the data
  fs.createReadStream(resolvedPath)
    .pipe(csv({ separator: ';' }))
    .on('data', (row: CsvRow) => {
      const bfsNr = parseInt(row['BFS-Nr']);
      const plz = row.PLZ;
      const gemeindename = row.Gemeindename;

      if (!plzToBfs[plz]) {
        plzToBfs[plz] = {};
      }

      if (plzToBfs[plz][gemeindename] && plzToBfs[plz][gemeindename] !== bfsNr) {
        console.error(`PLZ ${plz} for Gemeindename ${gemeindename} already exists with a different BFS-Nr: ${plzToBfs[plz][gemeindename]}`);
      }

      plzToBfs[plz][gemeindename] = bfsNr;
    })
    .on('end', () => {
      // Convert the object to a JSON string
      const jsonOutput = JSON.stringify(plzToBfs, null, 4);

      // Optionally, write the JSON output to a file
      const filePath = path.resolve(`${dataParsedBasePath}/postalCodes/`);
      fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(`${filePath}/postalCodes.json`, jsonOutput);
    });
};
