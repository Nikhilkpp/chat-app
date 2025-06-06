import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext'

export const useLogout = () => {
    const [loading , setLoading] = useState(false)
    const {setAuthUser} = useAuthContext()
    
    const Logout = async() =>{

        try {
            setLoading(true)
           
            const res =await fetch("http://localhost:8000/api/auth/logout",{
                method:"POST",
                headers: {"Content-Type": "application"},
                credentials: "include"
            })
            const data =await res.json()
            if(data.error){
                throw new Error(data.error)
            }else{
                toast.success(data.message)
            }
            localStorage.removeItem('chat-user')
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }

    }
    return {loading, Logout}

}
