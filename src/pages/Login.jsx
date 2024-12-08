import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from '../store/auth';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

    const [Data, setData] = useState({ username: "", password: "" });
    const history = useNavigate();
    const dispatch = useDispatch();
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
            if(Data.username === "" || Data.password === "" ) {
                alert("All fileds are required");
            } else {
                const response = await axios.post(
                    "http://localhost:1000/api/v1/log-in",
                    Data
                );
                setData({username: "", password: ""});
                console.log(response);
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                dispatch(authActions.login());
                history("/");
            }   
        } catch (error) {
            if (error.response) {
                // Server responded with a status code out of the range of 2xx
                alert(error.response.data.message);
            } else if (error.request) {
                // Request was made but no response received
                alert("No response from server. Please try again later.");
            } else {
                // Something else happened in setting up the request
                alert("Error: " + error.message);
            }
        }
    }

  return (
    <div className='h-[95vh] flex items-center justify-center'>
        <div className='p-4 w-2/6 rouded bg-gray-800'>
            <h2 className='text-2xl fotn-semibold'>Login</h2>
            <input 
                type="username" 
                placeholder='Username' 
                name='username' 
                className='px-3 py-2 w-full my-3 bg-gray-700'
                value= {Data.username}
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
            <div className='w-full flex items-center'>
                <button className='my-3 px-3 py-2 bg-green-400 rounded text-white' onClick={submit}>Login</button>
                <Link to="/signup" className='text-gray-400 hover:text-gray-200 mx-3'>Not having an account? Signup here.</Link>
            </div>
        </div>
    </div>
  )
}

export default Login