import {Server} from 'socket.io';
import http from 'http';
import express from 'express';


// const app = express();

let io;

// const server = http.createServer(app)
// const io = new Server(server, {
    // cors:{
    //     origin: ["https://chat-app-ep85.onrender.com"],
    //     methods: ["GET", "POST"]
    // }
// })
const userSocketMap = {}

const initSocket = (server) =>{
    io = new Server(server, {
        cors:{
            origin: ["http://localhost:5173"],
            methods: ["GET", "POST"]
        },
    })
    io.on('connection',(socket)=>{
        console.log("a user connected: ",socket.id)
    
        const userId = socket.handshake.query.userId;
        if (userId != "undefined") userSocketMap[userId] = socket.id
    
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
        socket.on('disconnect',()=>{
            console.log("user disconnected", socket.id)
            delete userSocketMap[userId]
            io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
        })
    
    })
}






 //stores as {userId: socketId}


export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];

}

// export {app, io, sever}
export {initSocket, io}

