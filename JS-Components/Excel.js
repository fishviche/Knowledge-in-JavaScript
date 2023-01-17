const xlsx = require('excel4node');
const wb = new xlsx.Workbook();
const ws1 = wb.addWorksheet('Sheet 1');
ws1.cell(1, 1).number(100);
wb.write('Excel.xlsx');
