import React from 'react'

import { CiHeart } from "react-icons/ci";
import { FaEdit, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';

const Cards = ({home, SetInputDiv, data, SetUpdateData}) => {

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    const handleCompleteTask = async (id) => {
        try {
            await axios.put(
                `http://localhost:1000/api/v2/update-complete-task/${id}`,
                {},
                { headers }
            );
        } catch(error) {
            console.log(error);
        }
    }

    const handleImportantTask = async (id) => {
        try {
            const response = await axios.put(
                `http://localhost:1000/api/v2/update-imp-task/${id}`,
                {},
                { headers }
            );
        } catch(error) {
            console.log(error);
        }
    }

    const handleUpdateTask = (id, title, desc) => {
        SetInputDiv("fixed");
        SetUpdateData({id: id, title: title, desc: desc });
        try {
                 axios.put(
                `http://localhost:1000/api/v2/update-task/${id}`,
                {},
                { headers }
            );
        } catch(error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:1000/api/v2/delete-task/${id}`,
                { headers }
            );
            console.log(response.data.message);
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4'>
            {data && data.map((items,i) => (
                <div key={i} className='flex flex-col justify-between bg-gray-800 rounded p-4'>
                    
                    {/* Add task button */}
                    <div className=''>
                        <h3 className='text-xl font-semibold'>{items.title}</h3>
                        <p className='text-gray-300 my-2'>{items.desc}</p>
                    </div>
                	
                    {/* Tasks list */}
                    <div className='mt-4 w-full flex items-center'>
                        <button 
                            className={` ${
                                items.complete === false ? "bg-red-400" : "bg-green-700" 
                            } p-2 rounded w-3/6`}
                            onClick={() => handleCompleteTask(items._id)}
                        >
                            {items.complete === true ? "Completed" : "In Completed" }
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                            
                            <button onClick={() => handleImportantTask(items._id)}>
                                { items.important === false ? (
                                     <CiHeart />
                                 ) : (
                                    <FaHeart className='text-red-500'/> 
                                )}
                            </button>
                            
                            {home !== "false" && <button onClick={() => handleUpdateTask(items._id, items.title, items.desc)}>
                                <FaEdit />
                            </button>}
                            
                            <button onClick={() => deleteTask(items._id)}>
                                <MdDelete />
                            </button>
                        </div>

                    </div>
                </div>
            ))}

            {/* Add task button  */}
            {home === "true" && (
                <button 
                    className='flex flex-col justify-center items-center bg-gray-800 rounded text-gray-300 hover:scale-105 hover-cursor-pointer transition-all transition-duration-300 p-4'
                    onClick={() => SetInputDiv("fixed")}  
                >
                    <IoAddCircleSharp className='text-5xl' />
                    <h2 className='text-2xl '>Add Task</h2>
                </button>
            )}
            
        </div>
    )
}

export default Cards