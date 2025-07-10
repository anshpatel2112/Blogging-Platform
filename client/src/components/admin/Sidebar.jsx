import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  return (
    <div className='flex flex-col bg-gradient-to-b from-surface via-primary/5 to-secondary/5 border-r border-primary/20 min-h-full pt-6 shadow-lg'>

      <NavLink 
        end={true} 
        to='/admin' 
        className={({isActive}) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg group ${isActive ? "bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/5 border-r-4 border-primary shadow-lg" : ""}`}
      >
        <img 
          src={assets.home_icon} 
          alt="" 
          className='min-w-4 w-5 transition-all duration-300 group-hover:scale-110'
        />
        <p className='hidden md:inline-block font-semibold transition-all duration-300 text-gray-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent'>
          Dashboard
        </p>
      </NavLink>

      <NavLink 
        to='/admin/addBlog' 
        className={({isActive}) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg group ${isActive ? "bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/5 border-r-4 border-primary shadow-lg" : ""}`}
      >
        <img 
          src={assets.add_icon} 
          alt="" 
          className='min-w-4 w-5 transition-all duration-300 group-hover:scale-110'
        />
        <p className='hidden md:inline-block font-semibold transition-all duration-300 text-gray-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent'>
          Create Blog
        </p>
      </NavLink>

      <NavLink 
        to='/admin/listBlog' 
        className={({isActive}) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg group ${isActive ? "bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/5 border-r-4 border-primary shadow-lg" : ""}`}
      >
        <img 
          src={assets.list_icon} 
          alt="" 
          className='min-w-4 w-5 transition-all duration-300 group-hover:scale-110'
        />
        <p className='hidden md:inline-block font-semibold transition-all duration-300 text-gray-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent'>
          Manage Blogs
        </p>
      </NavLink>

      <NavLink 
        to='/admin/comments' 
        className={({isActive}) => `flex items-center gap-3 py-4 px-3 md:px-9 md:min-w-64 cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:shadow-lg group ${isActive ? "bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/5 border-r-4 border-primary shadow-lg" : ""}`}
      >
        <img 
          src={assets.comment_icon} 
          alt="" 
          className='min-w-4 w-5 transition-all duration-300 group-hover:scale-110'
        />
        <p className='hidden md:inline-block font-semibold transition-all duration-300 text-gray-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent'>
          Comments
        </p>
      </NavLink>

      {/* Decorative Footer */}
      <div className='mt-auto mb-6 mx-3 md:mx-9'>
        <div className='h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent'></div>
        <div className='mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10'>
          <p className='text-xs text-gray-600 text-center'>
            <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-semibold'>WriteGrid</span> Admin Panel
          </p>
        </div>
      </div>

    </div>
  )
}

export default Sidebar