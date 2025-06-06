import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../contexts/AuthContext';

export const useLogin = () => {
  
    const [loading, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext();

    const Login = async({ username, password }) => {

        const success = handleLoginData({username,password});

        if (!success) return ;
        

        try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/api/auth/login", {
                method:"POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({ username, password }),
                credentials:"include"
            });

            const data = await res.json();

            if( data.error ){
                throw new Error(data.error);
            } else{
                console.log(data)
                toast.success("Logged In");                
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);


            
        } catch (error) {
            toast.error(error.message);
            
        } finally{
            setLoading(false);
        }
    }

    return { loading, Login}

}

const handleLoginData = ({username,password}) => {
    if(username === '' || password === ''){
        toast.error('Please fill all the fields')
        return false
    }
    if (password.length <6){
        toast.error('Password must be at least 6 digit')
        return false
    }
    return true

}
