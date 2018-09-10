// const status = document.getElementById('status');

// const form = document.getElementById('form');


const socket = io('http://localhost:3000');

const messages = document.getElementById('messages');
const form = document.getElementById('chat');
const input = document.getElementById('input');

const initializer_form = document.getElementById("initializer-form");
const initializer_input = document.getElementById("initializer-input");
const initializer_select = document.getElementById("initializer-select");
const greeting_wrapper = document.querySelector('.greetings-wrapper');
const main_wrapper = document.querySelector('.main-wrapper');
const fight_btn = document.getElementById("fight")
console.log(main_wrapper)

let canvas = document.getElementById('bubbleFighters');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
}

initializer_form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(initializer_select.value);
  console.log('wow', socket.id)
  socket.emit('initializer', { name: initializer_input.value, color: initializer_select.value, soket_id: socket.id });
  initializer_input.value = '';
  hideShowUI();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  console.log(input.value)
  socket.emit('chat', input.value);
  input.value = '';
});

function hideShowUI() {
  greeting_wrapper.classList.add("hidden");
  main_wrapper.classList.remove("hidden");
}
//  function resetStyles(){
//   greeting_wrapper.classList.remove("hidden");
//   main_wrapper.classList.add("hidden");
// }
function clearCircle(x, y, radius) {
  ctx.globalCompositeOperation = 'destination-out'
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.fill();
}
var globalPlayer1 = {};
var globalPlayer2 = {};
function InitialPlayer(datArray) {
  var playerOne = {};
  var playerTwo = {};
  console.log(datArray);
  datArray.forEach((player, i) => {
    if (i == 0) {
      playerOne.name = player.name
      playerOne.x = 150
      playerOne.y = 300
      playerOne.radius = 90
      playerOne.color = player.color
      playerOne.TotalLife = 100
      playerOne.id = player.soket_id

    } else {
      playerTwo.name = player.name;
      playerTwo.x = 650;
      playerTwo.y = 300;
      playerTwo.radius = 90;
      playerTwo.color = player.color;
      playerTwo.TotalLife = 100;
      playerTwo.id = player.soket_id;
    }
  })
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayerName(playerOne.name, 160, 200, playerOne.color);
  drawPlayerName(playerTwo.name || "waiting for a bubble...", 560, 200, playerTwo.color);
  drawCircle(playerOne.x, playerOne.y, playerOne.radius, playerOne.color);
  drawCircle(playerTwo.x, playerTwo.y, playerTwo.radius, playerTwo.color);
  globalPlayer1 = Object.assign(playerOne);
  globalPlayer2 = Object.assign(playerTwo);
}
canvas.addEventListener('click', (e) => {
  const mousePoint = {
    x: e.clientX,
    y: e.clientY
  }
  console.log('X', mousePoint.x);
  console.log('Y', mousePoint.y);
  check(mousePoint, globalPlayer1, globalPlayer2);
})
var fireOnceFlag = true;
function check(mousePoint, playerOne, playerTwo) {
  if (isIntersect(mousePoint, playerOne)) {
    console.log(fireOnceFlag)
    if (fireOnceFlag) {
      fireOnceFlag = false;
      console.log(fireOnceFlag);
      console.log(playerOne.TotalLife = playerOne.TotalLife - 10);
      globalPlayer1 = Object.assign(playerOne);
    
    }
  }
  if (isIntersect(mousePoint, playerTwo)) {
    console.log(fireOnceFlag)
    if (fireOnceFlag) {
      fireOnceFlag = false;
      console.log(fireOnceFlag);
      console.log(playerTwo.TotalLife = playerTwo.TotalLife - 10);
      globalPlayer2 = Object.assign(playerTwo);
      console.log('glplayer2',globalPlayer2)
    }
    console.log(playerTwo)
  }

}
function isIntersect(point, circle) {
  return Math.sqrt((point.x - circle.x) ** 2 + (point.y - circle.y) ** 2) < circle.radius;
}
fight_btn.addEventListener('click', e => {
  e.preventDefault();
  alert("fight")
})


// var circles = [
//   {
//     x: 150,
//     y: 300,
//     radius: 80,
//     color: 'green',
//     life: 100,
//     id: '[x]'
//   },
//   {
//     x: 600,
//     y: 300,
//     radius: 80,
//     color: 'red',
//     life: 100,
//     id: 'Enemy'
//   }
// ];


function printMessage(msg) {
  const li = document.createElement('li');
  li.innerHTML = msg;
  messages.appendChild(li);
  console.log(socket);
  drawChat(msg, 350, 50);
}

function drawCircle(centerX, centerY, radius, fillColor, visualShape) {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, visualShape || 0, Math.PI * 2, true);
  ctx.fill();
}

function drawPlayerName(name, positionX, positionY, color) {
  ctx.fillStyle = color;
  ctx.font = '22px serif';
  ctx.fillText(name, positionX, positionY);
}

function drawChat(msg, positionX, positionY) {
  ctx.fillStyle = "purple";
  ctx.font = '22px serif';
  ctx.clearRect(300, 10, canvas.width, 100);
  ctx.fillText(msg, positionX, positionY);
}

socket.on('chat', msg => printMessage(msg));
socket.on('initializer', (datArray) => InitialPlayer(datArray));

// socket.on('connect', () => checkName(socket.id));

socket.on('connect', () => {
  console.log("fuck")
});


// socket.on('initializePlayers', (datArray) => initializePlayers(datArray));


// function initializePlayers(datArray) {
//   console.log(datArray);
//   let x_cord;
//   let y_cord;
//   x_cord = 120;
//   y_cord = 200;
//   let clearArray = datArray.filter(function (item) {
//     return item.name != null;
//   });
//   console.log('CLEARARRAY', clearArray);
//   clearArray.forEach(item => {
//     let circle = {};
//     if (item.isgreen === true) {
//       drawPlayerName(item.name, x_cord, y_cord);
//       circle.x = 150
//       circle.y = 300
//       circle.radius = 80
//       circle.color = 'green'
//       circle.life = 100
//       circle.id = item.soket_id;
//       circles.push(circle);
//       drawCircle(circle.x, circle.y, circle.radius, circle.color);
//     } else {
//       circle.x = 600
//       circle.y = 300
//       circle.radius = 80
//       circle.color = 'red'
//       circle.life = 100
//       circle.id = item.soket_id;
//       circles.push(circle);
//       drawCircle(circle.x, circle.y, circle.radius, circle.color);
//       drawPlayerName(item.name, x_cord + 450, y_cord);
//     }
//   });
//   console.log(circles)
//   setPlayerPropertys(clearArray);
// }
// function setPlayerPropertys(propertys) {
//   console.log('setPlayerPropertys', propertys);
//   propertys.forEach(player => {
//     player.TotalLife = 100;
//   })
//   if (propertys.length > 2) {
//     alert("Only 2 players!Blind BITCH! Перегружай все заново!!!!");
//   }
//   console.log("player", propertys.length);
// }

// function checkName(socket_id) {
//   console.log(socket_id)
//   let current_name = prompt('ВашеИмя', 'player');
//   let is_green = confirm('green?');
//   console.log("isgreen?", is_green)
//   socket.emit('initializePlayers',
//     {
//       name: current_name,
//       isgreen: is_green,
//       soket_id: socket_id
//     });
// }

// circles.forEach(circle => {
//   drawCircle(circle.x, circle.y, circle.radius, circle.color, );
//   console.log(circle)
// });

