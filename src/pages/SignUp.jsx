import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const SignUp = () => {
    const [Data, setData] = useState({ username: "", email: "", password: "" });
    const history = useNavigate();
    const isLoiggedIn = useSelector((state) => state.auth.isLoiggedIn);
    if(isLoiggedIn === true) {
        history("/");
    }

    const change = (e) => {
        const {name,value} = e.target;
        setData({...Data, [name]: value });
    };

    const submit = async () => {
        try {
            if(Data.username === "" || Data.email === "" || Data.password === "" ) {
                alert("All fileds are required");
            } else {
                const response = await axios.post(
                    "http://localhost:1000/api/v1/sign-up",
                    Data
                );
                setData({username: "", email: "", password: ""});
                console.log(response);
                history('/login');
            }   
        } catch(error) {
            alert(error.response.data.message);
        }
    }

  return (
    <div className='h-[95vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rouded bg-gray-800'>
            <h2 className='text-2xl fotn-semibold'>Signup</h2>
            <input 
                type="username" 
                placeholder='Username' 
                name='username' 
                className='px-3 py-2 w-full my-3 bg-gray-700' 
                value= {Data.username}
                onChange={change}
            />
            <input 
                type="email" 
                placeholder='Email' 
                name='email' 
                className='px-3 py-2 w-full my-3 bg-gray-700' 
                required
                value= {Data.email}
                onChange={change}
            />
            <input 
                type="password" 
                placeholder='Password' 
                name='password' 
                className='px-3 py-2 w-full my-3 bg-gray-700' 
                value= {Data.password}
                onChange={change}
            />
            <div className='w-full flex items-center my-3'>
                <button className='px-3 py-2 bg-green-400 rounded text-white' onClick={submit}>Signup</button>
                <Link to="/login" className='text-gray-400 hover:text-gray-200 mx-3'>Already having an account? Login here.</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp