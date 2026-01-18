import { STORAGE_KEYS } from "../../data/storageKeys.js";

let listenerInitialized = false;

export function updateButtonContainer() {
  const container = document.getElementById('subject-button-container'); 
  const subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.subjects));
  const students = JSON.parse(localStorage.getItem(STORAGE_KEYS.students));
  try {
    if(!students && !subjects) {
      throw "Upload both required lists first.";
    }

    if(!students) {
      throw "Upload students.xlsx list first.";
    }

    if(!subjects) {
      throw "Upload subjects.xlsx list first.";
    }

    let subjectButtonsHTML = '';

    subjects.forEach((subject) => {
      subjectButtonsHTML += `
        <div class="flex flex-wrap justify-center gap-6">
          <button data-subject-code="${subject.Code}" class="js-subject-button aspect-square h-30 sm:h-45 bg-white shadow-[0_0_15px_5px_rgba(0,0,0,0.03)] rounded-2xl transition-colors duration-100 hover:bg-gray-300 hover:cursor-pointer font-semibold">
            <p data-subject-code="${subject.Code}" class="js-button-name p-5"></p>
          </button>
        </div>
      `;
    });
    
    container.innerHTML = subjectButtonsHTML;

    document.querySelectorAll('.js-button-name').forEach((nameHolder) => {
      const subjectCode = nameHolder.dataset.subjectCode;
      const subjects = JSON.parse(localStorage.getItem(STORAGE_KEYS.subjects));
      const subjectsMap = new Map(subjects.map(subject => [subject.Code, subject]));
      const matchingSubject = subjectsMap.get(subjectCode);
      nameHolder.textContent = matchingSubject.Name;
    })

    if(!listenerInitialized) {
      initSubjectButtons(container);
      listenerInitialized = true;
    }

  } catch (error) {
    const errorHTML = `<p class="text-sm text-gray-500 text-shadow-md text-shadow-gray-200 font-semibold">${error}</p>`;
    container.innerHTML = errorHTML;
  }
}

function initSubjectButtons(container) {
  container.addEventListener('click', (event) => {
    const button = event.target.closest('.js-subject-button');
    if (button) {
      localStorage.setItem(STORAGE_KEYS.selectedSubject, button.dataset.subjectCode);
      window.location.href = './previous.html';
    }
  });
}