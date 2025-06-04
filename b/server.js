import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import connectToMongo from "./db/connectToMongo.js";
import messageRouter from "./routes/message.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";


dotenv.config()

const PORT=process.env.PORT || 5000;

const app=express();

// app.get('/', (req,res)=>{
//     res.send("Hello world again!")
// })

app.use(express.json())
app.use(cookieParser())

app.listen(PORT,()=> {
    connectToMongo()
    console.log("Server is listing",PORT
        
    )});
app.use("/api/auth",authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRouter)