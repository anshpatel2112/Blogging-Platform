import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext';

const Navbar = () => {

    
    const {navigate, token, user, setToken, setUser, axios} = useAppContext()

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/logout');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setToken(null);
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

  return (
    <div className='flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32'>
      <img onClick={()=>navigate('/')} src={assets.logo_bp} alt="logo" className='w-32 sm:w-44 cursor-pointer' />
      <div className='flex items-center gap-4'>
        {user ? (
          <div className='flex items-center gap-4'>
            <span className='text-gray-700 font-medium'>Welcome, {user.name}</span>
            {user.role === 'admin' && (
              <button 
                onClick={()=>navigate('/admin')}  
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300'
              >
                Dashboard
                <img src={assets.arrow} className='w-3' alt="arrow" />
              </button>
            )}
            <button 
              onClick={handleLogout}
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gray-600 text-white px-6 py-2 hover:bg-gray-700 hover:scale-105 transition-all duration-300'
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='flex items-center gap-3'>
            <button 
              onClick={()=>navigate('/login')}  
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-primary text-primary px-6 py-2 hover:bg-primary hover:text-white hover:scale-105 transition-all duration-300'
            >
              Login
            </button>
            <button 
              onClick={()=>navigate('/register')}  
              className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-primary via-secondary to-accent text-white px-6 py-2 hover:shadow-xl hover:scale-105 transition-all duration-300'
            >
              Register
              <img src={assets.arrow} className='w-3' alt="arrow" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
