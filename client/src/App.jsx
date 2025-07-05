import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Bloglist from './components/Bloglist'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog/>}/>
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/header' element={<Header/>}/>
        <Route path='/bloglist' element={<Bloglist/>}/>
      </Routes>
    </div>
  )
}

export default App