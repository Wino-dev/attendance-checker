import * as XLSX from '../../node_modules/xlsx/xlsx.mjs';

document.getElementById('import-students-file').addEventListener('change', (input) => {
  const file = input.target.files[0];
  const fileReader = new FileReader();
  fileReader.readAsArrayBuffer(file);
  fileReader.onload = (loadedFile) => {
    const arrayBuffer = loadedFile.target.result;
    const data = new Uint8Array(arrayBuffer);
    const excelFile = XLSX.read(data, {type: 'array'});
    const firstSheet = excelFile.Sheets[excelFile.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(firstSheet);
    console.log(students);
    try {
      students.forEach((student) => {
        if(!('name' in student)){
          throw 'shet nasan aking salamin';
        }

        if(!('studentId' in student)) {
          throw 'bakit ngayong gig ko pa naiwan';
        }

        if(!(Object.keys(student).length == 2)) {
          throw 'ang paligid pa naman ay madilim';
        }
      });

      console.log('wala error yehey');
      document.querySelector('.js-students-list-chosen').innerText = file.name;
    } catch (error) {
      alert(error);
    }  
  }

  fileReader.onerror = () => {
    alert('fileReader.error');
  }
});