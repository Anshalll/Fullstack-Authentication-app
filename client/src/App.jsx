import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
import {useDispatch , useSelector} from 'react-redux'
import {Auth , UnAuth} from './redux/AuthSlice/slice.js'

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Resetpass = lazy(() => import("./pages/Resetpass.jsx"));


export default function App() {

  const dispatch = useDispatch()
  const {user, loader}  = useSelector((state) => state.authslice)

 
  useEffect(() => {

    const valiated = async () => {

      try {
        const response = await fetch("http://localhost:4000/" , {
          credentials: 'include'
        });
        
        
        if (!response.ok) {
          dispatch(UnAuth())
        }
    
        const { auth } = await response.json();
        dispatch(Auth(auth))
        
        
      } catch (error) {
        dispatch(UnAuth())
      }

      
    }
    
    valiated();



  
  }, [dispatch]);


  return (
    <Router>
     {loader ? "Loading..." :  <Suspense fallback={<div>Loading...</div>}>
        <Routes>
      
          <Route element={<ProtectedRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpass/:id" element={<Resetpass />} />
          </Route>

        
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={"Manish"}/>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>}
    </Router>
  );
}
