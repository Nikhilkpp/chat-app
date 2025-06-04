import mongoose  from "mongoose";

const connectToMongo=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("database connected successfully");
        
    } catch (error) {
        console.log("Error occured while connecting mongo", error);
        
        
    }
}
export default connectToMongo;