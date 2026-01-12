setInterval(() => {
  let time = new Date();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let meridiem;

  if (hour > 12) {
    hour -= 12;
    meridiem = "PM";
  } else meridiem = "AM"

  document.querySelector('.js-clock').innerText = `${hour}:${minute} ${meridiem}`;
  
},1000)