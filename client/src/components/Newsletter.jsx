import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Never Miss a Blog!</h1>
      <p className='md:text-lg text-gray-600 pb-8'>Subscribe to get the latest technical insights, tutorials, and exclusive developer content.</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12 shadow-xl rounded-xl overflow-hidden'>
        <input className='border border-gray-300 rounded-lg h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all' type="text" placeholder='Enter your email address' required/>
        <button type='submit' className='md:px-12 px-8 h-full text-white bg-gradient-to-r from-primary via-secondary to-accent hover:from-accent hover:via-primary hover:to-secondary transition-all cursor-pointer rounded-lg rounded-l-none shadow-lg'>Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter
