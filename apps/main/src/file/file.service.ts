import { Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';
import { ReadExcelsOptions } from './file.interface';

@Injectable()
export class FileService {
  readExcelFileFromBuffer(buffer, options: ReadExcelsOptions = {}) {
    const workbook = read(buffer, {
      type: 'buffer',
      cellDates: options.cellDates ?? true,
      dateNF: options.dateNF ?? 'DD/MM/YYYY HH:mm:ssx1  ',
      raw: true
    });
    const data: any = {};
    for (const sheetName of workbook.SheetNames) {
      data[sheetName] = utils.sheet_to_json(workbook.Sheets[sheetName]);
    }
    return data;
  }

  flatDataFromAllSheet(data) {
    let totalData = [];
    const sheets = Object.keys(data);
    for (const sheet of sheets) {
      totalData = totalData.concat(data[sheet]);
    }
    return totalData;
  }
}
