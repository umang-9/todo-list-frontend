import React, {useEffect, useState} from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const Incompletedtasks = () => {
  const [Data, SetData] = useState();

  const headers = {
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
  }

  useEffect(() => {
      const fetch = async() => {
          const response = await axios.get(
              "http://localhost:1000/api/v2/get-incomplete-task", 
              { headers }
          );
          SetData(response.data.data);
      };
      fetch();
  });

  return (
    <div>
      <Cards home={"false"} data={Data} />
    </div>
  )
}

export default Incompletedtasks