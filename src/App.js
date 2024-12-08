import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Alltasks from './pages/Alltasks';
import Completedtasks from './pages/Completedtasks';
import Incompletedtasks from './pages/Incompletedtasks';
import Importanttasks from './pages/Importanttasks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { authActions } from './store/auth';

function App() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoiggedIn = useSelector((state) => state.auth.isLoiggedIn);

  useEffect(() => {
    if( localStorage.getItem("id") && localStorage.getItem("token") ) {
      dispatch(authActions.login());
    } else if(isLoiggedIn === false) {
      navigate("/signup");
    }
  }, [])
  
  return (
    <div className="bg-gray-900 text-white h-screen p-5 relative">
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<Alltasks />}></Route>
            <Route path='/importanttasks' element={<Importanttasks />}></Route>
            <Route path='/completedtasks' element={<Completedtasks />}></Route>
            <Route path='/incompletedtasks' element={<Incompletedtasks />}></Route>
          </Route>
          <Route path="/login" element={<Login />}>Login</Route>
          <Route path="/signup" element={<SignUp />}>Signup</Route>
        </Routes>
    </div>
  );
}

export default App;
