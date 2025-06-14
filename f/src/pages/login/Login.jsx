import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

function Login() {

    const {loading, Login} = useLogin();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async(e)=>{
        e.preventDefault();
        console.log('data to login is:=>  ',{username,password})
        
        await Login({username, password});
    }

  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop:filter backdrop:blur-lg bg-opacity-0'>
            <h1 className="text-3xl font-semibold text-center text-gray-300">Login
                <span className='text-blue-500'>ChatApp</span>
            </h1>
            <form action="" onSubmit={handleLogin}>
                <div>
                    <label  className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <input type="text" 
                        placeholder='Enter your username...' 
                        className="w-full input input-bordered h-10" 
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)} />
                </div>

                <div>
                    <label  className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input 
                        type="password"
                        placeholder='Enter password'
                        className='w-full input input-bordered h-10'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                     />
                </div>
                <Link to={'/signup'} className='text-sm hover:underline hover:text-blue-400 mt-2 inline-block'>
                    {"Don't"} have an account?
                </Link>

                <div>
                    {loading ? <span className='block mx-auto loading loading-spinner'></span> 
                    
                        :
                        <button className='btn btn-block btn-sm mt-2'>Login</button>
                    }
                </div>

            </form>
        </div>
    </div>
  )
}

export default Login