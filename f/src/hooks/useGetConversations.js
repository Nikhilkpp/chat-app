import {useEffect, useState} from 'react';
import toast from 'react-hot-toast'
const apiUrl = import.meta.env.VITE_API_BASE_URL;



export const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
      const getConversation =async() => {
        setLoading(true)

        try {
            const res = await fetch(`${apiUrl}/api/users/`,{
                method: "GET",
                credentials: "include"
            });
            const data= await res.json()
            if (data.error){
                throw new Error(data.error);
            }

            setConversations(data)
            
        } catch (error) {
            toast.error(error.message)            
        } finally{
            setLoading(false)
        }
      }
    
      getConversation();
    }, [])
    
    return {loading, conversations}
}
export default useGetConversations;
