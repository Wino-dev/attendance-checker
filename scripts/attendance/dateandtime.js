import { CONFIG } from '../config.js';
import { formatTimeForDisplay, formatDateString } from '../utils/dateutils.js';

let clockInterval;

export function renderTime() {
  if (clockInterval) clearInterval(clockInterval);

  clockInterval = setInterval(() => {
    const time = new Date();
    const hours = time.getHours();
    const minutes = time.getMinutes();

    const displayHours = hours > 12 ? hours - 12 : (hours == 0 ? 12 : hours);
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    const minuteString = minutes.toString().padStart(2, '0');

    document.querySelector('.js-clock').innerText = `${displayHours}:${minuteString} ${meridiem}`
  }, CONFIG.CLOCK_UPDATE_INTERVAL_MS)
}

export function renderDate() {
  const time = new Date();
  const month = time.toLocaleString('default', {month: 'long'});
  const day = time.getDate();
  const year = time.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  document.getElementById('date').innerText = fullDate;
}

export function renderSubjectDetails(selectedSubject) {
  const startTimeFormatted = formatTimeForDisplay(selectedSubject['Start Time']);
  document.getElementById('start-time').innerText = startTimeFormatted;
  document.getElementById('subject').innerText = selectedSubject.Name;
}

export function formatDateJSON(dateJSON) {
  const date = new Date(dateJSON.Year, parseInt(dateJSON.Month) - 1, parseInt(dateJSON.Day));
  return formatDateString(date);
}
