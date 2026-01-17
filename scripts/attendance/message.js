import { STORAGE_KEYS } from "../../data/storageKeys.js";

const updateHighlight = document.getElementById('update-highlight');
const updateName = document.getElementById('update-name');
const updateStatus = document.getElementById('update-status');

export function initMessageBox(subject) {
  const savedPreviousLog = localStorage.getItem(STORAGE_KEYS.attendancePreviousLog(subject.Code));

  if (savedPreviousLog) {
    updateName.textContent = savedPreviousLog;
  } 
}

function recentLog(studentName, subject) {
  const recentLog = studentName;
  updateHighlight.textContent = 'Recent Log:';
  updateName.textContent = recentLog;
  localStorage.setItem(STORAGE_KEYS.attendancePreviousLog(subject.Code), recentLog);
};

export function updateMessageBox(student, subject) {
  setTimeout(() => {
    updateStatus.classList.add('hidden');
    recentLog(student.Name, subject);
  }, 2000);

  updateHighlight.textContent = 'Added:';
  updateName.textContent = student.Name;
  updateStatus.classList.remove('hidden');
  updateStatus.textContent = `(${student.Status})`;
  /*
  messageBox.innerHTML = `
    <p class="font-bold w-fit pr-2">Added:</p>
		<p class="w-fit pr-2">${student.Name}</p>
    <p class="font-bold w-fit">(${student.Status})</p>
  `;
  */
};