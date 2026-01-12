setInterval(() => {
  let time = new Date();
  let hour = time.getHours();
  let minute = (time.getMinutes()).toString();
  let meridiem;

  if (hour > 12) {
    hour -= 12;
    meridiem = "PM";
  } else meridiem = "AM"

  if (!minute[1]) {
    minute = '0' + minute;
  }

  document.querySelector('.js-clock').innerText = `${hour}:${minute} ${meridiem}`;
  
},1000)