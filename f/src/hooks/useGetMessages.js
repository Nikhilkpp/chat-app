import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_BASE_URL;


export const useGetMessages = () => {
    const {messages, selectedConversation,setMessages} = useConversation();
  
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {

            const fetchMessage = async() => {
        
                setLoading(true)
            try {
                const res = await fetch(`${apiUrl}/api/messages/${selectedConversation?._id}`,{
                    method:"GET",
                    credentials:"include"
                })
                const data = await res.json();
                if (data.error){
                    throw new Error(data.error)
                }
                setMessages(data)
                
            } catch (error) {
                toast.error(error.message)
                setMessages([])
            }finally{
                setLoading(false)
            }
        }

        if (selectedConversation?._id) fetchMessage()
      
    }, [selectedConversation?._id, setMessages])

    return {messages, loading}
}
