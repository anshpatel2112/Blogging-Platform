import React from 'react'
import { assets, footer_data } from '../assets/assets'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-surface via-primary/5 to-secondary/5'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>

        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6 text-gray-600'>A modern technical blogging platform designed for developers, engineers, and tech enthusiasts to share knowledge and build community.</p>
        </div>

        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section, index)=> (
                <div key={index}>
                    <h3 className='font-bold text-base bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent md:mb-5 mb-2'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>
                        {section.links.map((link, i)=> (
                            <li key={i}>
                                <a href="#" className='hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:bg-clip-text hover:text-transparent transition-all duration-200'>{link}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>


      </div>
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>Copyright 2025 © TechBlog Platform - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
