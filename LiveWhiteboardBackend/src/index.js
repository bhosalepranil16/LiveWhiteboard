const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { addUser, getUsers } = require('./utils/user');
 
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 8080;

let imageUrl = {};

io.on('connection', (socket) => {
  console.log('user connected');
    socket.on('USER_JOINED', (data) => {
      console.log('USER_JOINED', data);
        const { roomId, userId, username, isHost } = data;
        const user = addUser(socket.id, roomId, userId, username, isHost);
        const roomUsers = getUsers(user.roomId);
        console.log(roomUsers);

        socket.join(user.roomId);
        socket.emit('MESSAGE', 'Welcome...');
        socket.broadcast.to(user.roomId).emit('MESSAGE', `${user.username} has joined.`);

        io.to(user.roomId).emit('USERS', roomUsers);
        io.to(user.roomId).emit('CANVAS_IMAGE', imageUrl[user.roomId]);
    });

    socket.on('DRAWING', (data) => {
        imageUrl[data.roomId] = data.imageUrl;
        socket.broadcast.to(data.roomId).emit('CANVAS_IMAGE', data.imageUrl);
    });

    // socket.on('disconnect', () => {
    //     const userLeaves = removeUser(socket.id);
    //     const roomUsers = getUsers(userLeaves.roomId);
    
    //     if (userLeaves) {
    //       io.to(userLeaves.room).emit('MESSAGE', {
    //         message: `${userLeaves.username} left the chat`,
    //       });
    //       io.to(userLeaves.room).emit('USERS', roomUsers);
    //     }
    // });

});



server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
