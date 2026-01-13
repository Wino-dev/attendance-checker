const messageBox = document.getElementById('message-box');

function recentLog(studentName) {
  messageBox.innerHTML = `
    <p class="font-bold w-fit pr-2">Recent Log:</p>
		<p class="w-fit">${studentName}</p>
  `;
};

export function updateMessageBox(studentName, status) {
  setTimeout(() => {
    recentLog(studentName);
  }, 2000);
  messageBox.innerHTML = `
    <p class="font-bold w-fit pr-2">Added:</p>
		<p class="w-fit pr-2">${studentName}</p>
    <p class="font-bold w-fit">(${status})</p>
  `;
};