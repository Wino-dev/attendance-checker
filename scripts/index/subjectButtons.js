
export function updateButtonContainer() {
  const container = document.getElementById('subject-button-container'); 
  const subjects = JSON.parse(localStorage.getItem('subjects'));
  const students = JSON.parse(localStorage.getItem('students'));
  try {

    console.log(subjects);

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
            <p class="p-5">
              ${subject.Name}
            </p>
          </button>
        </div>
      `;
    });
    
    container.innerHTML = subjectButtonsHTML;
    initSubjectButtons();

  } catch (error) {
    console.log('catch worked');
    console.log(container.innerHTML);
    const errorHTML = `<p class="text-sm text-gray-500 text-shadow-md text-shadow-gray-200 font-semibold">${error}</p>`;
    console.log(errorHTML)
    container.innerHTML = errorHTML;
    console.log(container.innerHTML);
  }
}

function initSubjectButtons() {
  document.querySelectorAll('.js-subject-button').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('selectedSubject', button.dataset.subjectCode);
      window.location.href = './attendance.html';
    })
  })
}