export function renderTime() {
  setInterval(() => {
    const time = new Date();
    let hour = time.getHours();
    let minute = (time.getMinutes()).toString();
    let meridiem;

    if (hour >= 12) {
      hour -= 12;
      meridiem = "PM";
    } else meridiem = "AM"

    if (hour == 0) {
      hour = 12;
    }

    if (!minute[1]) {
      minute = '0' + minute;
    }

    document.querySelector('.js-clock').innerText = `${hour}:${minute} ${meridiem}`;
  },1000);
}


export function renderDate() {
  const time = new Date();
  const month = time.toLocaleString('default', {month: 'long'});
  const day = time.getDate();
  const year = time.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  document.getElementById('date').innerText = fullDate;
}

export function formatDateJSON(date) {
  const month = date.Month;
  const day = date.Day;
  const year = date.Year;

  return `${month}-${day}-${year}`;
}

export function renderSubjectDetails(selectedSubject) {
  document.getElementById('subject').innerText = selectedSubject.Name;
  let startTimeString = selectedSubject['Start Time'];
  let isHourSingleDigit;
  if(startTimeString.length == 6) {
    startTimeString = '0' + startTimeString;
    isHourSingleDigit = true;
  }

  let hours = startTimeString[0] + startTimeString[1];
  let minutes = startTimeString[3] + startTimeString[4];
  let meridiem = startTimeString[5] + startTimeString[6];

  if (isHourSingleDigit) {
    hours = startTimeString[1];
  }

  const startTimeFormatted = `${hours}:${minutes} ${meridiem}`; 

  document.getElementById('start-time').innerText = startTimeFormatted;
} 
