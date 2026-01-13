import { subjects } from "../../data/subjects.js";

export function getStartTimeDate(startTimeString) {
  if(startTimeString.length == 7) {
    startTimeString = '0' + startTimeString;
  }

  try {
    if (startTimeString.length != 8) {
      throw 'Invalid format: Too Short';
    }

    for (let i = 0; i < 2; i++) {
      if (isNaN(startTimeString[i])) {
        throw 'Invalid format: 00:00 XX format only';
      }
    }

    for (let i = 3; i < 5; i++) {
      if (isNaN(startTimeString[i])) {
        throw 'Invalid format: 00:00 XX format only';
      }
    }

    if (startTimeString[2] != ':') {
      throw 'Invalid format: 00:00 XX format only'; 
    }

    if (startTimeString[5] != ' ') {
      throw 'Invalid format: 00:00 XX format only'; 
    }

    if (Number(startTimeString[0]) > 1) {
      throw 'Invalid format: 12HR format only'; 
    }

    if (Number(startTimeString[3]) > 5) {
      throw 'Invalid format: 12HR format only'; 
    }

    const meridiem = startTimeString[6] + startTimeString[7];

    if (meridiem != 'AM' && meridiem != 'PM') {
      throw 'Invalid format: AM or PM only';
    }

    let hours = Number(startTimeString[0] + startTimeString[1]);

    if (hours > 12) {
      throw 'Invalid format: 12HR format only'; 
    }
    
    if (meridiem == 'PM' && hours != 12) {
      hours += 12;
    }

    if (meridiem == 'AM' && hours == 12) {
      hours = 0;
    }

    let minutes = Number(startTimeString[3] + startTimeString[4]);

    console.log('correct format');

    const currentDate = new Date();

    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      hours,
      minutes
    );

  } catch (error) {
    console.log(error);
  }
}

const selectedSubject = subjects[0];

document.getElementById('subject').innerText = selectedSubject.name;
document.getElementById('start-time').innerText = selectedSubject.startTime;

