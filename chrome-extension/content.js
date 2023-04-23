const message = 'Este mensaje ha sido inyectado por mi extensión';
const div = document.createElement('div');
const body = document.querySelector('body');
div.textContent = message;
body.insertBefore(div, body.firstChild);