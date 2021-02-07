const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {cors: {accept: '*'}});
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');
const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');
const User = require('./model/userModel');
const Rooms = require('./model/roomsModel');

app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use('/api', authRouter, userRouter);

const PORT = config.port || 8000;


const start = async () => {
    try {
        await mongoose.connect(config.mongodb, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        io.on('connection', (socket) => {
            socket.on('ADD_FRIEND', async ({id, idFriend}) => {
                const room = new Rooms({
                    users: [
                        id,
                        idFriend
                    ]
                });
                await room.save();
                await User.updateOne({_id: id}, {$push: {
                    friends: idFriend,
                    rooms: room
                }});
                await User.updateOne({_id: idFriend}, {$push: {
                    friends: id,
                    rooms: room
                }});
                io.sockets.emit('SET_USER', {id, idFriend});
            });
            socket.on('CONNECT_ROOM', ({ idRoom }) => {
                socket.join(idRoom);
                socket.on('ADD_MESSAGE', ({message, userId}) => {
                    io.to(idRoom).emit('SET_MESSAGE', {msg: message, idUserMsg: userId});
                });
                socket.on('LEAVE_ROOM', ({idRoom}) => {
                    socket.leave(idRoom);
                })
            });
        });

        http.listen(PORT, () => console.log('server start'));
    } catch (e) {
        console.log(e)
    }
}

start();