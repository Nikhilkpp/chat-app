import {  createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'
import { useContext } from "react";
const apiUrl=import.meta.env.VITE_API_BASE_URL;

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext)
}


export const SocketContextProvider= ({children})=> {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser}=useAuthContext();
    useEffect(() => {
        if(authUser){
            const socket=io(`${apiUrl}`, {
                query:{
                    userId: authUser._id,
                }
            })
            setSocket(socket);

            socket.on("getOnlineUsers", (users)=> {
                setOnlineUsers(users)
            })
            return ()=> socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    
      
    }, [authUser])
    


    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}
