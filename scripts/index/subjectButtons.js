export function updateButtonContainer(students, subjects) {
  const container = document.getElementById('subject-button-container'); 
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
          <button data-subject-id="${subject.subjectCode}" class="js-subject-button aspect-square h-30 sm:h-45 bg-white shadow-[0_0_15px_5px_rgba(0,0,0,0.03)] rounded-2xl transition-colors duration-100 hover:bg-gray-300 hover:cursor-pointer font-semibold">
            <p class="p-5">
              ${subject.subjectName}
            </p>
          </button>
        </div>
      `;
    });
    
    container.innerHTML = subjectButtonsHTML;
    initSubjectButtons();

  } catch (error) {
    container.innerHTML = `<p class="text-sm text-gray-500 text-shadow-md text-shadow-gray-200 font-semibold">${error}</p>`;
  }
}

const subjectButtonsHTML = `
  <div class="flex flex-wrap justify-center gap-6">
    <button class="aspect-square h-30 sm:h-45 bg-white shadow-[0_0_15px_5px_rgba(0,0,0,0.03)] rounded-2xl transition-colors duration-100 hover:bg-gray-300 hover:cursor-pointer">button 1</button>
  </div>
`;

function initSubjectButtons() {
  console.log('goods');
  document.querySelectorAll('.js-subject-button').forEach((button) => {
    button.addEventListener('click', () => {
      localStorage.setItem('selectedSubject', button.dataset.subjectId);
      window.location.href = './attendance.html';
    })
  })
}