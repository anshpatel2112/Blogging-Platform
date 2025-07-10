import React from 'react'
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {

    const {title, description, category, image, _id} = blog;
    const navigate = useNavigate()

  return (
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-xl overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl hover:shadow-primary/20 duration-300 cursor-pointer bg-white border border-gray-100 group'>
      <img src={image} alt="" className='aspect-video'/>
      <span className='ml-5 mt-4 px-3 py-1 inline-block bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-full text-primary text-xs font-medium border border-primary/20'>{category}</span>
      <div className='p-5'>
        <h5 className='mb-2 font-semibold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300'>{title}</h5>
        <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html": description.slice(0,80)}}></p>
      </div>
    </div>
  )
}

export default BlogCard
