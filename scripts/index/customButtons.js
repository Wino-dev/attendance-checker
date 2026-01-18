export function initCustomButtons () {
  document.getElementById('redirect-to-edit').addEventListener('click', () => {
    window.location.href = './edit.html';
  });

  document.getElementById('redirect-to-custom').addEventListener('click', () => {
    window.location.href = './custom.html';
  });
}