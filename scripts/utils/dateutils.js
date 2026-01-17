function padZero(timeUnit) {
  return timeUnit.toString().padStart(2, '0');
}

export function dateToJSON(date) {
  return {
    Month: padZero(date.getMonth() + 1),
    Day: padZero(date.getDate()),
    Year: date.getFullYear()
  }
}

export function jsonToDate(dateJSON) {
  return new Date (
    dateJSON.Year,
    parseInt(dateJSON.Month) - 1,
    parseInt(dateJSON.Day)
  )
}

export function formatDateDisplay(date) {
  const month = date.toLocaleString('default', {month: 'long'});
  const day = date.getDate();
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`;
}

export function formatDateString(date) {
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  return `${month}-${day}-${date.getFullYear()}`;
}

export function areSameDate(date1, date2) {
  return (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getDate() == date2.getDate()
  );
}

export function parseTime12Hour(timeString) {
  const match = timeString.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) throw new Error('Invalid time format');
  
  let [, hours, minutes, meridiem] = match;
  hours = parseInt(hours);
  minutes = parseInt(minutes);
  
  if (meridiem.toUpperCase() === 'PM' && hours !== 12) hours += 12;
  if (meridiem.toUpperCase() === 'AM' && hours === 12) hours = 0;
  
  return { hours, minutes };
}

export function getStartTimeDate(startTimeString) {
  const { hours, minutes } = parseTime12Hour(startTimeString);
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    hours,
    minutes
  );
}

export function formatTimeForDisplay(timeString) {
  const { hours, minutes } = parseTime12Hour(timeString);
  const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
  const meridiem = hours >= 12 ? 'PM' : 'AM';
  return `${displayHours}:${padZero(minutes)} ${meridiem}`;
}