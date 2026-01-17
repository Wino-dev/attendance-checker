import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

export function XLSXtoJSON(file, callback) {
  const fileReader = new FileReader();
  
  fileReader.readAsArrayBuffer(file);

  fileReader.onload = (loadedFile) => {
    const arrayBuffer = loadedFile.target.result;
    const data = new Uint8Array(arrayBuffer);
    const excelFile = XLSX.read(data, {type: 'array'});
    const firstSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const objects = XLSX.utils.sheet_to_json(firstSheet);
    callback(null, objects);
  }
  fileReader.onerror = () => {
    callback(new Error('Error in fileReader'));
  }
}