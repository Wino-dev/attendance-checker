const messageBox = document.getElementById('message-box');

export function initMessageBox(subject) {
  const savedPreviousLog = localStorage.getItem(`attendance-previous-log-${subject.Code}`);

  if(!savedPreviousLog) {
    messageBox.innerHTML = `
      <p class="font-bold w-fit pr-2">Recent Log:</p>
      <p class="w-fit">None</p>
    `
  } else {
    messageBox.innerHTML = savedPreviousLog;
  }
}

function recentLog(studentName, subject) {
  const log = `
    <p class="font-bold w-fit pr-2">Recent Log:</p>
		<p class="w-fit">${studentName}</p>
  `;

  messageBox.innerHTML = log;
  localStorage.setItem(`attendance-previous-log-${subject.Code}`, log);
};

export function updateMessageBox(student, subject) {
  setTimeout(() => {
    recentLog(student.Name, subject);
  }, 2000);
  messageBox.innerHTML = `
    <p class="font-bold w-fit pr-2">Added:</p>
		<p class="w-fit pr-2">${student.Name}</p>
    <p class="font-bold w-fit">(${student.Status})</p>
  `;
};