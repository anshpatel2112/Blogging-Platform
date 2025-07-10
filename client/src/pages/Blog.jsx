import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const {id} = useParams()

  const {axios} = useAppContext()

  const [data, setData] = useState(null)
  const [comments, setComments] = useState([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const fetchBlogData = async ()=>{
    try {
      const {data} = await axios.get(`/api/blog/${id}`)
      data.success ? setData(data.blog) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchComments = async () =>{
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      if (data.success){
        setComments(data.comments)
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const addComment = async (e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/blog/add-comment', {blog: id, name, content});
      if (data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
         toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchBlogData()
    fetchComments()
  },[])

  return data ? (
    <div className='relative'>
      <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50'/>
      
      <Navbar/>

      <div className='text-center mt-20 text-gray-600'>
        <p className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent py-4 font-semibold'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto text-gray-600'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 font-medium'>
          <span className='bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>Tech Author</span>
        </p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
          <img src={data.image} alt="" className='rounded-3xl mb-5'/>

          <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

          {/* Comments Section */}
          <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4'>Comments ({comments.length})</p>
            <div className='flex flex-col gap-4'>
                {comments.map((item, index)=>(
                  <div key={index} className='relative bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/10 max-w-xl p-4 rounded-xl text-gray-600 shadow-lg'>
                    <div className='flex items-center gap-2 mb-2'>
                      <img src={assets.user_icon} alt="" className='w-6'/>
                      <p className='font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>{item.name}</p>
                    </div>
                    <p className='text-sm max-w-md ml-8'>{item.content}</p>
                    <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
                  </div>
                ))}
            </div>
          </div>

          {/* Add Comment Section */}
          <div className='max-w-3xl mx-auto'>
             <p className='font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4'>Add your comment</p>
             <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>

                <input onChange={(e)=> setName(e.target.value)} value={name} type="text" placeholder='Your name' required className='w-full p-3 border border-gray-300 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all'/>

                <textarea onChange={(e)=> setContent(e.target.value)} value={content} placeholder='Share your thoughts...' className='w-full p-3 border border-gray-300 rounded-lg outline-none h-32 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none' required></textarea>

                <button type="submit" className='bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg px-8 py-3 hover:shadow-xl hover:scale-105 transition-all cursor-pointer font-medium'>Submit Comment</button>
             </form>
          </div>

          {/* Share Buttons */}
          <div className='my-24 max-w-3xl mx-auto'>
              <p className='font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent my-4'>Share this article</p>
              <div className='flex'>
                <img src={assets.facebook_icon} width={50} alt="" />
                <img src={assets.twitter_icon} width={50} alt="" />
                <img src={assets.googleplus_icon} width={50} alt="" />
              </div>
          </div>
      </div>
      <Footer/>

    </div>
  ) : <Loader/>
}

export default Blog
