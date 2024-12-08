import React, {useEffect, useState} from 'react'
import Cards from '../components/Home/Cards';

import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';

const Alltasks = () => {

    const [InputDiv, SetInputDiv] = useState("hidden");

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    const [Data, SetData] = useState();
    const [UpdateData, SetUpdateData] = useState({
        id: "",
        title: "",
        desc: ""
    });

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
    });

    // Data && console.log(Data.tasks);

    return (
        <div>
            <div className='w-full flex  justify-end items-end px-4'>
                <button onClick={() => SetInputDiv("fixed")} >
                    <IoAddCircleSharp className='text-4xl text-gray-300 hover:text-gray-100 transtion-all transition-duration-300' />
                </button>
            </div>
            
            { Data && 
                <Cards 
                    home={"true"} 
                    SetInputDiv={SetInputDiv} 
                    data={Data.tasks} 
                    SetUpdateData={SetUpdateData}
                /> 
            }
            
            <InputData 
                InputDiv={InputDiv} 
                SetInputDiv={SetInputDiv}
                UpdateData={UpdateData}
                SetUpdateData={SetUpdateData}
            />
        </div>
    )
}

export default Alltasks