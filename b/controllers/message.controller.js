import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage= async (req,res)=>{
    try {
        const {message}=req.body;
        const {id: receiverId}=req.params;
        const senderId=req.user._id
        // console.log("yhhan tak thik hsi")

        let conversation= await Conversation.findOne({
            participants:{ $all : [senderId, receiverId]}
        });

        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId, receiverId]
            });
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await conversation.save();
        await newMessage.save();

        // these above steps could take some more time, as it is running one by one.
        // so next step will run these both lines in parallel in order to save time

        // await Promise.all(conversation.save(), newMessage.save());


        //socket functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }



        res.status(201).json(newMessage)
        
    } catch (error) {
        console.log("error in sendMessage Controller: ",error.message);
        
        res.status(500).json({error:"Internal server error"})
        
    }

};


export const getMessages= async(req, res)=>{
    try {
        const {id: userToChatId} = req.params;
        const senderId= req.user._id

        const conversation=await Conversation.findOne({
            participants:{$all : [senderId, userToChatId]}
        }).populate("messages");

        if(!conversation) return res.status(100).json([]);

        const messages=conversation.messages;
        
        res.status(200).json(messages);


        
    } catch (error) {
        console.log("error in getMessage Controller: ",error.message);
        
        res.status(500).json({error:"Internal server error"})
        
    }
}

