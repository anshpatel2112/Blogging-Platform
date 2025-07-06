import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.js';

export const addBlog = async (req , res)=>{
    try {
        const {title, subTitle, description, category,isPublished } = JSON.parse(req.body.blog) ;
        const imageFile = req.file;

        //check if all fields are present
        if(!title || !description || !category || !imageFile){
            return res.json({success : false,message:"Missing required fileds"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        //upload Image to Imagekit
        const response = await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder: "/blogs"
        })
      
        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality:'auto'},//Auto compression
                {format:'webp'},//convert to modern format 
                {width:'1280'} // width resizing
            ]
        });

        const image = optimizedImageUrl;
        await Blog.create({title,subTitle,description,category,image,isPublished})

        res.json({success:true, message: "Blog added successfully"})
        

    } catch (error) {
        res.json({success:false, message: error.message})
    }
}

export const getAllBlogs = async (req , res) =>{
        try {
            const blogs=await Blog.find({isPublished:true})
            res.json({success:true, blogs})
        } catch (error) {
            res.json({success:false , message: error.message})
        }

}