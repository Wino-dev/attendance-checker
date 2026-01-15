export function getStartTimeDate(startTimeString) {
  if(startTimeString.length == 6) {
    startTimeString = '0' + startTimeString;
  }

  const meridiem = startTimeString[5]+ startTimeString[6];     

  let hours = Number(startTimeString[0] + startTimeString[1]);

  if (meridiem == 'PM' && hours != 12) {
    hours += 12;
  }

  if (meridiem == 'AM' && hours == 12) {
    hours = 0;
  }

  let minutes = Number(startTimeString[3] + startTimeString[4]);

  const currentDate = new Date();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );
}





