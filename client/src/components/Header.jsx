import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

  const {setInput, input} = useAppContext()
  const inputRef = useRef()

  const onSubmitHandler = async (e)=>{
     e.preventDefault();
     setInput(inputRef.current.value)
  }

  const onClear = ()=>{
    setInput('')
    inputRef.current.value = ''
  }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
      <div className='text-center mt-20 mb-8'>

        <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full text-sm text-primary shadow-lg'>
            <p>New: AI-Powered Content Generation</p>
            <img src={assets.star_icon} className='w-2.5' alt="" />
        </div>

        <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-800'>Modern <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'> Technical</span> <br/> <span className='bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent'>Blogging Platform</span></h1>

        <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600'>Share your technical insights, tutorials, and innovations with the developer community. Built for creators who code and think beyond boundaries.</p>

        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded-xl overflow-hidden shadow-lg'>
            <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none'/>
            <button type="submit" className='bg-gradient-to-r from-primary via-secondary to-accent text-white px-8 py-2 m-1.5 rounded-lg hover:scale-105 transition-all cursor-pointer shadow-lg'>Search</button>
        </form>

      </div>

      <div className='text-center'>
        {
        input && <button onClick={onClear} className='border border-primary/30 bg-gradient-to-r from-primary/5 to-secondary/5 font-light text-xs py-2 px-4 rounded-full shadow-lg cursor-pointer hover:shadow-xl transition-all'>Clear Search</button>
        }
      </div>

      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
    </div>
  )
}

export default Header
