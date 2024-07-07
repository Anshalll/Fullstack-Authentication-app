import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
import ProtectedRoute from './auth/ProtectedRoute';
import { useGetAccessDataQuery } from './redux/Apis/Apis.js';

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const Resetpass = lazy(() => import("./pages/Resetpass.jsx"));


export default function App() {

  const [user, setUser] = useState(null);
  const {data  , isLoading , error} = useGetAccessDataQuery()
 
  useEffect(() => {
    
    if (!isLoading) {
      if (data?.auth) {
        setUser(data.auth)
      }
      if (error?.data?.auth) {
          setUser(error.data.auth)
      } 
    }  
  
  }, [data , isLoading , error]);


  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
      
          <Route element={<ProtectedRoute user={!user} redirect="/" />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpass/:id" element={<Resetpass />} />
          </Route>

        
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
