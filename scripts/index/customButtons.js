export function initCustomButtons () {
  document.getElementById('redirect-to-edit').addEventListener('click', () => {
    window.location.href = './edit.html';
  });
}