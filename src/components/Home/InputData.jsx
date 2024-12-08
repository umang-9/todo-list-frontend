import React, { useEffect, useState } from 'react';

import { RxCross2 } from "react-icons/rx";
import axios from 'axios';


const InputData = ({InputDiv, SetInputDiv, UpdateData, SetUpdateData}) => {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    const [Data,setData] = useState({ title: "", desc: "" });
    const change = (e) => {
        const {name, value} = e.target;
        setData({...Data, [name]: value});
    };
    const submitData = async () => {
        if(Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        } else {
            await axios.post(
                "http://localhost:1000/api/v2/create-task",
                Data,
                { headers }
            );
            setData({title: "", desc: ""});
            SetInputDiv("hidden");
        }
    };

    const UpdateTask = async () => {
        if(Data.title === "" || Data.desc === "") {
            alert("All fields are required");
        } else {
            await axios.put(
                `http://localhost:1000/api/v2/update-task/${UpdateData.id}`,
                Data,
                { headers }
            );
            SetUpdateData({
                id: "",
                title: "",
                desc: ""    
            });
            setData({
                title: "",
                desc: ""    
            })
            SetInputDiv("hidden");
        }
    };

    useEffect(() => {
        setData({title: UpdateData.title, desc: UpdateData.desc})
    }, [UpdateData]);

    return (
        <>
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
            
            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-3/6 bg-gray-900 p-4 rounded'>
                    
                    <div className='flex justify-end'>
                        <button 
                            className='text-xl' 
                            onClick={() => {
                                SetInputDiv("hidden");
                                setData({
                                    title: "",
                                    desc: ""    
                                })
                                SetUpdateData({
                                    id: "",
                                    title: "",
                                    desc: ""    
                                })
                            }} 
                        >
                            <RxCross2 />
                        </button>
                    </div>

                    <input 
                        type="text" 
                        placeholder='Title' 
                        name='title' 
                        className='px-3 py-2 w-full my-3 bg-gray-700' 
                        value={Data.title}
                        onChange={change}
                    /> 
                    
                    <textarea 
                        cols="30" 
                        rows="10" 
                        placeholder='Enter the description...' 
                        name='desc' 
                        className='my-3 px-3 py-2 w-full bg-gray-700' 
                        value={Data.desc}
                        onChange={change}
                    />

                    {UpdateData.id === "" ? (
                        <button 
                            type='submit' 
                            className='my-3 px-3 py-2 bg-green-400 rounded text-white'
                            value={Data.title}
                            onClick={submitData}
                        >
                            Submit
                        </button>
                    ) : (
                        <button 
                            type='submit' 
                            className='my-3 px-3 py-2 bg-green-400 rounded text-white'
                            value={Data.title}
                            onClick={UpdateTask}
                        >
                            Update
                        </button>
                    )} 
                
                </div>
            </div>
        </>
    )
}


export default InputData