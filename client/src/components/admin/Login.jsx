import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        '/api/admin/login',
        { email, password },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Login successful!");
        setToken(true);                  
        navigate('/admin');              //redirect to admin dashboard
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
                Admin
              </span>{' '}
              Login
            </h1>
            <p className='font-light text-gray-600'>
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label> Email </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                required
                placeholder='your email id'
                className='border-b-2 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 p-2 outline-none mb-6 transition-all'
              />
            </div>
            <div className='flex flex-col'>
              <label> Password </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                required
                placeholder='your password'
                className='border-b-2 border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary/20 p-2 outline-none mb-6 transition-all'
              />
            </div>
            <button
              type="submit"
              className='w-full py-3 font-medium bg-gradient-to-r from-primary via-secondary to-accent text-white rounded cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
