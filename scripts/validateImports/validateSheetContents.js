export function validateSheetContents(objects, properties, buttonId) {
  let lineNumber = 0;
  try {
    objects.forEach((object) => {
          
      lineNumber++;

      let errors = '';

      if(!(Object.keys(object).length == properties.length)) {
        errors += 'Error: Invalid list format\n';
      }

      properties.forEach((property) => {
        if(!(property in object)){
          errors += `Error: ${property} doesn't exist in line ${lineNumber}\n`;
        }
      });

      if (errors) {
        throw errors;
      }

      if (buttonId == 'import-subjects-file') {
        let startTimeString = object['Start Time'];
        if(startTimeString.length == 6) {
          startTimeString = '0' + startTimeString;
        }
        errors = validateTimeFormat(startTimeString);
      };

      if (errors) {
        throw errors;
      }

      return '';

    });
  } catch (error) {
    return error;
  }
}

function validateTimeFormat(startTimeString) {
  const errors = '';
  if (startTimeString.length != 7) {
    errors += `Invalid format: Invalid Time Format in line ${lineNumber}\n`;
  }

  let invalidHours = false
  let invalidMinutes = false

  for (let i = 0; i < 2; i++) {
    if (isNaN(startTimeString[i])) {
      invalidHours = true;
    }
  }

  if (invalidHours) {
    errors += `Invalid format: Invalid Hours in line ${lineNumber}\n`;  
  }

  for (let i = 3; i < 5; i++) {
    if (isNaN(startTimeString[i])) {
      invalidMinutes = true;
    }
  }

  if (invalidMinutes) {
    errors += `Invalid format: Invalid Minutes Format in line ${lineNumber}\n`; 
  }

  if (startTimeString[2] != ':') {
    errors += `Invalid format: Invalid Time Format in line ${lineNumber}\n`;
  }

  if (Number(startTimeString[3]) > 5) {
    errors += `Invalid format: Too much minutes in line ${lineNumber}\n`; 
  }

  const meridiem = startTimeString[5] + startTimeString[6];

  if (meridiem != 'AM' && meridiem != 'PM') {
    errors += `Invalid format: Not AM or PM in line ${lineNumber}\n`;
  }

  let hours = Number(startTimeString[0] + startTimeString[1]);

  if (hours > 12) {
    checkHasFailed += `Invalid format: Not 12HR format in line ${lineNumber}\n`; 
  }

  return errors;
}