import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const AppContext = createContext();
export const AppProvider = ({children}) =>{

    const navigate = useNavigate();
    const [token , setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [blogs,setBlogs] = useState([]);
    const [input,setInput] = useState("");

    const fetchBlogs = async ()=>{
        try {
           const {data}= await axios.get('/api/blog/all');
           data.success ? setBlogs(data.blogs) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get('/api/user/profile');
            if (data.success) {
                setUser(data.user);
            }
        } catch (error) {
            console.log('Error fetching user profile:', error);
        }
    };
    useEffect(()=>{
        fetchBlogs();
        const token = localStorage.getItem('token')
        if(token){
            setToken(token);
            axios.defaults.headers.common['Authorization'] = token;
            fetchUserProfile();
        }
    },[])
    
            const value  = {
                axios,navigate,token,setToken,user,setUser,blogs,setBlogs,input,setInput,fetchUserProfile
            }
    return(


        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const  useAppContext =()=>{
    return useContext(AppContext)
}