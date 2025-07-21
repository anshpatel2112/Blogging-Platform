import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Login = () => {
    const { axios, setToken, setUser, navigate } = useAppContext();
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const { data } = await axios.post('/api/user/login', formData);

            if (data.success) {
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('token', data.token);
                axios.defaults.headers.common['Authorization'] = data.token;
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-surface via-primary/5 to-secondary/5'>
            <div className='w-full max-w-md p-8 bg-white border border-primary/30 shadow-xl shadow-primary/15 rounded-xl'>
                <div className='text-center mb-8'>
                    <h1 className='text-3xl font-bold mb-2'>
                        <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>
                            Welcome Back
                        </span>
                    </h1>
                    <p className='text-gray-600'>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email address'
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password'
                            className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300'
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className='w-full py-3 font-medium bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                    >
                        {isLoading ? (
                            <span className='flex items-center justify-center gap-2'>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                Signing In...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className='mt-6 text-center'>
                    <p className='text-gray-600'>
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className='text-primary hover:text-secondary transition-colors font-medium'
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;