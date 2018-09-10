const Server = require('socket.io');

const server = new Server(3000);
var dataArray = [];
server.on('connection', socket => {
    console.log(socket.id)
    socket.on('initializer', (data) => {
        dataArray.push(data);
        server.emit('initializer', dataArray);
        console.log(dataArray)
    })
    socket.on('chat', msg => {
        server.emit('chat', msg);
        console.log(msg);
    });
    socket.on('disconnect', (reason) => {
        dataArray.forEach((element, i) => {
            console.log("ELEMENT",element);
            if (element.soket_id == socket.id) {
                dataArray.splice(i, 1)
            }
        });
        console.log("DATA ARRAY FROM DISCONNECT",dataArray);
        server.emit('initializer', dataArray);
    });

    // socket.on('initializePlayers', (data) => {
    //     dataArray.push(data);
    //     server.emit('initializePlayers', dataArray);
    //     console.log(dataArray)
    // })
})