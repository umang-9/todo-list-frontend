import React from 'react';

import Sidebar from '../components/Home/Sidebar';
import { Outlet } from 'react-router-dom';
import Cards from '../components/Home/Cards';

const Home = () => {
  return (
    <div className='flex h-[93vh] gap-4'>
        <div className='w-1/4 border border-gray-500 rounded-xl p-4 flex flex-col'>
            <Sidebar />
        </div>
        <div className='w-3/4 border border-gray-500 rounded-xl p-4'>
            <Outlet />
        </div>
    </div>
  )
}

export default Home