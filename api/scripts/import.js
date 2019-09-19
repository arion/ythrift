import csv from 'csv-parser'
import fs from 'fs'

import { processCSVRow } from '../server/src/extras/import_parser'

if (!process.env.npm_config_file || !process.env.npm_config_user_id) {
  throw "Arguments --file and --user_id is required"
}

const rowMapping = {
  actualCents: {
    process: 'floatToCents',
    columnName: 'Сумма'
  },
  date: {
    process: 'rusStringToDate',
    columnName: 'Дата'
  },
  description: {
    process: 'noop',
    columnName: 'Подробно'
  },
  mainCategoryName: {
    process: 'noop',
    columnName: 'Категория'
  },
  subCategoryName: {
    process: 'noop',
    columnName: 'Подкатегория'
  },
  categoryKind: {
    process: 'rusToKind',
    columnName: 'Доход/Расход'
  }
}

// usage: npm run import --file=/path/to/csv
fs.createReadStream(process.env.npm_config_file)
  .pipe(csv())
  .on('data', (row) => {
    processCSVRow(row, process.env.npm_config_user_id, rowMapping)
  })
  .on('end', () => {
    console.log('CSV file successfully processed')
  });