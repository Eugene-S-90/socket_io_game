// const status = document.getElementById('status');
// const messages = document.getElementById('messages');
// const form = document.getElementById('form');
// const input = document.getElementById('input');

// const ws = new WebSocket('ws://localhost:3000');



// function setStatus(value) {
//     status.innerHTML = value;
//     console.log(value)
// }

// function printMessage(value) {
//     const li = document.createElement('li');

//     li.innerHTML = value;
//     messages.appendChild(li);
//     console.log(value)
// }

// form.addEventListener('submit', e => {
//     e.preventDefault();
//     ws.send(input.value);
//     input.value = '';
// })

// ws.onopen = () => setStatus('Yo are online');

// ws.onclose = () => setStatus('Disconnected');

// ws.onmessage = response => printMessage(response.data)
