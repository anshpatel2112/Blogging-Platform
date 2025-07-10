import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'

const AddBlog = () => {

    const {axios} = useAppContext()
    const [isAdding, setIsAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const [image, setImage] = useState(false);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('Startup');
    const [isPublished, setIsPublished] = useState(false);

    const generateContent = async ()=>{
        if(!title) return toast.error('Please enter a title')

        try {
            setLoading(true);
            const {data} = await axios.post('/api/blog/generate', {prompt: title})
            if (data.success){
                quillRef.current.root.innerHTML = parse(data.content)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const onSubmitHandler = async (e) =>{
        try {
            e.preventDefault();
            setIsAdding(true)

            const blog = {
                title, subTitle, 
                description: quillRef.current.root.innerHTML,
                category, isPublished
            }

            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog))
            formData.append('image', image)

            const {data} = await axios.post('/api/blog/add', formData);

            if(data.success){
                toast.success(data.message);
                setImage(false)
                setTitle('')
                setSubTitle('')
                quillRef.current.root.innerHTML = ''
                setCategory('Startup')
                setIsPublished(false)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally{
            setIsAdding(false)
        }
        
    }

    useEffect(()=>{
        // Initiate Quill only once
        if(!quillRef.current && editorRef.current){
            quillRef.current = new Quill(editorRef.current, {theme: 'snow'})
        }
    },[])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-gradient-to-br from-surface via-primary/5 to-secondary/5 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-6 md:p-10 sm:m-10 shadow-xl rounded-xl border border-primary/10'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2'>Create New Blog Post</h1>
          <p className='text-gray-600'>Share your technical insights with the developer community</p>
        </div>

        {/* Upload thumbnail */}
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Upload Thumbnail</p>
          <label htmlFor="image" className='block'>
              <div className='relative group cursor-pointer'>
                <img 
                  src={!image ? assets.upload_area : URL.createObjectURL(image)} 
                  alt="" 
                  className='mt-2 h-20 w-32 object-cover rounded-lg border-2 border-dashed border-primary/30 group-hover:border-primary/60 transition-all duration-300 group-hover:scale-105'
                />
                <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center'>
                  <span className='text-xs font-medium text-primary'>Click to upload</span>
                </div>
              </div>
              <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
          </label>
        </div>

        {/* Blog title */}
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Blog Title</p>
          <input 
            type="text" 
            placeholder='Enter an engaging title for your blog post' 
            required 
            className='w-full max-w-lg p-3 border border-gray-300 outline-none rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300' 
            onChange={e => setTitle(e.target.value)} 
            value={title}
          />
        </div>

        {/* Sub title */}
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Subtitle</p>
          <input 
            type="text" 
            placeholder='Add a compelling subtitle (optional)' 
            className='w-full max-w-lg p-3 border border-gray-300 outline-none rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300' 
            onChange={e => setSubTitle(e.target.value)} 
            value={subTitle}
          />
        </div>

        {/* Blog Description */}
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Blog Content</p>
          <div className='max-w-lg h-80 pb-16 sm:pb-10 pt-2 relative border border-gray-300 rounded-lg overflow-hidden'>
              <div ref={editorRef} className='h-full'></div>
              {loading && ( 
              <div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-white/90 backdrop-blur-sm'>
                  <div className='flex flex-col items-center gap-3'>
                    <div className='w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin'></div>
                    <p className='text-sm text-gray-600'>Generating content with AI...</p>
                  </div>
              </div> )}
              <button 
                disabled={loading} 
                type='button' 
                onClick={generateContent} 
                className='absolute bottom-2 right-2 text-xs text-white bg-gradient-to-r from-primary via-secondary to-accent px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                ✨ Generate with AI
              </button>
          </div>
        </div>

        {/* Blog category */}
        <div className='mb-6'>
          <p className='font-semibold text-gray-700 mb-3'>Category</p>
          <select 
            onChange={e => setCategory(e.target.value)} 
            value={category}
            name="category" 
            className='px-4 py-3 border border-gray-300 outline-none rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 bg-white'
          >
              {blogCategories.filter(item => item !== 'All').map((item, index)=>{
                  return <option key={index} value={item}>{item}</option>
              })}
          </select>
        </div>

        {/* Publish toggle */}
        <div className='flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-lg border border-primary/10'>
          <input 
            type="checkbox" 
            checked={isPublished} 
            className='w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 cursor-pointer' 
            onChange={e => setIsPublished(e.target.checked)}
          />
          <div>
            <p className='font-semibold text-gray-700'>Publish Immediately</p>
            <p className='text-sm text-gray-600'>Make this blog post visible to readers right away</p>
          </div>
        </div>

        {/* Submit button */}
        <button 
          disabled={isAdding} 
          type="submit" 
          className='w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-lg cursor-pointer font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
        >
            {isAdding ? (
              <span className='flex items-center gap-2'>
                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                Publishing...
              </span>
            ) : (
              <span className='flex items-center gap-2'>
                🚀 Publish Blog
              </span>
            )}
        </button>

      </div>
    </form>
  )
}

export default AddBlog