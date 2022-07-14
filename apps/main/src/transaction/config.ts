// noinspection SpellCheckingInspection
/**
 * Because @nestjs/common FileTypeValidator using (file.mimetype as string).math(fileType)
 * So we will mapping xlsx to 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
 */
export const allowFileType = [
  'csv', // csv
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // xlsx
  'application/vnd.ms-excel' // xls
];
