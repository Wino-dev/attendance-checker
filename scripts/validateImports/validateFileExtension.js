export function validateFileExtension (file) {
  if(!file) {
    return 'No file selected.';
  } else if(!file.name.endsWith('.xlsx')) {
    return 'Please upload a .xlsx file';
  } 

  return;
}