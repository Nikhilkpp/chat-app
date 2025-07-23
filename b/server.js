import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongo from "./db/connectToMongo.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import path from 'path';
import cors from 'cors'
import { app, server } from "./socket/socket.js";


dotenv.config()

const PORT=process.env.PORT || 5000;

const __dirname = path.resolve();

// const app=express();    socket se aarha

// app.get('/', (req,res)=>{
//     res.send("Hello world again!")
// })

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:process.env.CORS_ORIGIN,

    credentials:true
}))

server.listen(PORT,()=> {
    connectToMongo()
    console.log("Server is listing",PORT
        
    )});
app.use("/api/auth",authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRouter)
app.use(express.static(path.join(__dirname, "/f/dist")));

app.get("", (req,res)=>{
    res.sendFile(path.join(__dirname, "f", "diat", "index.html"))
})