import { initSelectedSubject } from "../../data/subjects.js";
import { initStudentsAttendanceList } from "../../data/students.js";
import { renderChoiceButtons } from "./choice.js";
import { STORAGE_KEYS } from "../../data/storageKeys.js";

const selectedSubject = initSelectedSubject();
const previousListMadeOnSameDate = initStudentsAttendanceList(selectedSubject);
const retrievedListStatus = localStorage.getItem(STORAGE_KEYS.actionTaken(selectedSubject.Code));

if (retrievedListStatus != 'new') {
  const page = document.querySelector('main');
  page.classList.remove('hidden');
  renderChoiceButtons(selectedSubject, previousListMadeOnSameDate);
} else {
  history.replaceState(null, '', './index.html');
  window.location.href = './attendance.html';
}

