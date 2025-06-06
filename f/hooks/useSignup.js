import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../contexts/AuthContext';

export const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const {authUser, setAuthUser} = useAuthContext();

  const signup = async ({ fullName, username, password, confirmPassword, gender}) => {
 
    const success=handleInputs({ fullName, username, password, confirmPassword, gender});
  
    if (!success) return;
  
    setLoading(true);

    try {
      
      const res= await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify( { fullName, username, password, confirmPassword, gender}),
        credentials:"include"

      });

      const data = await res.json()
      if(data.error){
        toast.error(data.error);
        throw new Error(data.error)
      }else{
        toast.success("User registered successfully")
      }

      //add data to local storage
      localStorage.setItem("chat-user", JSON.stringify(data));

      //context
      setAuthUser(data);



      console.log("fetched data: ",data)
      
    } catch (error) {
      toast.error(error.message);
        
    } finally{
      setLoading(false);
    }
  };
  return( {loading, signup} )

  
}
export default useSignup;
const handleInputs=({ fullName, username, password, confirmPassword, gender})=>{
  // if(
  //   [fullName,username,password,confirmPassword,gender].some((field)=> (field?.trim === ""))
  // )
  if(fullName ==='' || username ==='' || password ==='' || confirmPassword ==='' || gender === '')
  {
    toast.error('Please fill          all the fields');
    return false;
  }
  if (password !== confirmPassword){
    toast.error("Passwords do not match");
    return false;
  }
  if(password.length <6){
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
}