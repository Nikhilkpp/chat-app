// import express from "express";
// import dotenv from "dotenv";
// import authRouter from "./routes/auth.routes.js";
// import connectToMongo from "./db/connectToMongo.js";
// import messageRouter from "./routes/message.routes.js";
// import userRouter from "./routes/user.routes.js";
// import cookieParser from "cookie-parser";
// import path from 'path';
// import cors from 'cors'
// import { initSocket } from "./socket/socket.js";
// import http from 'http';


// dotenv.config()

// const PORT=process.env.PORT || 5000;

// const __dirname = path.resolve();

// const app=express();   // socket se aarha
// const server = http.createServer(app);
// initSocket(server)
// // app.get('/', (req,res)=>{
// //     res.send("Hello world again!")
// // })

// app.use(express.json())
// app.use(cookieParser())

// app.use(cors({
//     origin:process.env.CORS_ORIGIN,

//     credentials:true
// }))


// app.use("/api/auth",authRouter)
// app.use("/api/messages", messageRouter)
// app.use("/api/users", userRouter)
// app.use(express.static(path.join(__dirname, "/f/dist")));

// app.get("*", (req,res)=>{
//     res.sendFile(path.join(__dirname, "f", "dist", "index.html"))
// })

// server.listen(PORT,()=> {
//     connectToMongo();
//     console.log("Server is listening",PORT);
// });



import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const __dirname = path.resolve();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());


app.use(cors({
    origin:process.env.CORS_ORIGIN,

    credentials:true
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port ${PORT}`);
});
