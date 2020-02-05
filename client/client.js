var sock = io();

document.getElementById('rock').addEventListener('click', choose);
document.getElementById('paper').addEventListener('click', choose);
document.getElementById('scissors').addEventListener('click', choose);

function choose (event) {
  sock.emit('choice', event.currentTarget.id);
}
