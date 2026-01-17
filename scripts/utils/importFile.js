import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

export function XLSXtoJSON(file) {
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);

  let objects;
  fileReader.onload = (loadedFile) => {
    const arrayBuffer = loadedFile.target.result;
    const data = new Uint8Array(arrayBuffer);
    const excelFile = XLSX.read(data, {type: 'array'});
    const firstSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    objects = XLSX.utils.sheet_to_json(firstSheet);
  }
  fileReader.onerror = () => {
    alert('fileReader.error');
  }
  return objects;
}