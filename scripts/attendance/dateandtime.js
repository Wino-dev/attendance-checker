setInterval(() => {
  let time = new Date();
  let hour = time.getHours();
  let minute = (time.getMinutes()).toString();
  let meridiem;

  if (hour > 12) {
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

const time = new Date();
const month = time.toLocaleString('default', {month: 'long'});
const day = time.getDate();
const year = time.getFullYear();
const fullDate = `${month} ${day}, ${year}`;

document.getElementById('date').innerText = fullDate;