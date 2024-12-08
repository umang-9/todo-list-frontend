import React, { useEffect, useState } from 'react';

import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {

    const dispatch = useDispatch();
    const history = useNavigate();

    const data = [
        {
            title: "All tasks",
            icons: <CgNotes />,
            link: "/",
        },
        {
            title: "Important tasks",
            icons: <MdLabelImportant />,
            link: "/importanttasks",
        },
        {
            title: "Completed tasks",
            icons: <FaCheckDouble />,
            link: "/completedtasks",
        },
        {
            title: "Incompleted tasks",
            icons: <TbNotebookOff />,
            link: "/incompletedtasks",
        },
    ];

    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("login");
    }
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const [Data, SetData] = useState();
    useEffect(() => {
        const fetch = async() => {
            const response = await axios.get(
                "http://localhost:1000/api/v2/get-all-task", 
                { headers }
            );
            SetData(response.data.data);
        };
        if( localStorage.getItem("id") && localStorage.getItem("token") ) {
            fetch();
        }
    }, []);

    return (
        <>
            {Data && (
                <div>
                    <h2 className='text-xl font-semibold'>{Data.username}</h2>
                    <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
                <hr />
            </div>
            )}

            <div className='mt-5'>
                {data.map((items, i) => (
                    <Link to={items.link} key={i} className='flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300'>
                        {items.icons}&nbsp; <span>{items.title}</span>
                    </Link>
                ))}
            </div>

            <div className='justify-self-end mt-auto'>
                <button className='bg-gray-500 w-full p-2 rounded' onClick={logout}>Logout</button>
            </div>
        </>
    )
}

export default Sidebar