import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import AdminLogin from './components/admin/Login'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ProtectedRoute from './components/ProtectedRoute'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

  const {token, user} = useAppContext()

  // Check if user is admin
  const isAdmin = user?.role === 'admin';

  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/blog/:id' element={<ProtectedRoute><Blog/></ProtectedRoute>} />
        <Route path='/admin' element={token && isAdmin ? <Layout/> : <AdminLogin/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='addBlog' element={<AddBlog/>}/>
          <Route path='listBlog' element={<ListBlog/>}/>
          <Route path='comments' element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;
