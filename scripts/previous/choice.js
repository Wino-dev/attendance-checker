import { STORAGE_KEYS } from "../../data/storageKeys.js";
import { jsonToDate, areSameDate, formatDateDisplay } from "../utils/dateutils.js";

export function renderChoiceButtons(selectedSubject, previousListMadeOnSameDate) {
  const choiceMessageContainer = document.getElementById('choice-message');
  let creationDateDesc = '';

  const creationDateStringJSON = JSON.parse(localStorage.getItem(STORAGE_KEYS.attendanceDateCreation(selectedSubject.Code)));
  const creationDate = jsonToDate(creationDateStringJSON);

  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  yesterdayDate.setHours(0,0,0,0);
  const fullDate = formatDateDisplay(creationDate);

  if (previousListMadeOnSameDate) {
    creationDateDesc = 'today';
  } else if (areSameDate(yesterdayDate, creationDate)) {
    creationDateDesc = 'yesterday'
  } else {
    creationDateDesc = 'on ' + fullDate;
  };

  const choiceMessage = `The system detected that you've had a previous attendance on the same subject (${selectedSubject.Name}) made ${creationDateDesc}. Select an option below`;
  
  choiceMessageContainer.innerText = choiceMessage;

  let choiceContainerHTML = '';
  let choices = []
  if (previousListMadeOnSameDate) {
    choices.push({
      func: 'reload',
      desc: 'Reload Previous Attendance'
    });  
  }

  choices.push({
    func: 'save',
    desc: 'Save the Previous Attendance and Create New'
  }, {
    func: 'delete',
    desc: 'Create New Without Saving'
  });

  choices.forEach((choice) => {
    choiceContainerHTML += `
      <button data-choice="${choice.func}" class="js-choice-button bg-white py-3 px-5 rounded-2xl shadow-[0_0_15px_5px_rgba(0,0,0,0.03)] hover:cursor-pointer hover:bg-yellow-300 transition-colors duration-100">${choice.desc}</button>
    `
  });

  document.getElementById('choice-container').innerHTML = choiceContainerHTML;

  document.querySelectorAll('.js-choice-button').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = button.dataset.choice;
      localStorage.setItem(STORAGE_KEYS.actionTaken(selectedSubject.Code), choice);
      history.replaceState(null, '', './index.html');
      window.location.href = './attendance.html';
    })
  });
}