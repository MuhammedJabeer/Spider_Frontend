import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home'
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import Signup from './Components/Auth/Signup'
import Signin from './Components/Auth/Signin'
import ProtectedRoute from './Components/ProtectedRoute';
import { AuthProvider } from './Context/Authcontext';


function App() {
  return (
    <>
      <BrowserRouter>
      <AuthProvider>

     
      <Routes>
       <Route path='/' element={<Signup/>} />
       <Route path='/Signin' element={<Signin/>} />



       <Route path='/home'  element={
        <ProtectedRoute>
           <Home/>
        </ProtectedRoute>
        
        } />


      </Routes>
       </AuthProvider>
      </BrowserRouter>
       
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  )
}

export default App
