import fs from 'fs'
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

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
        const response = await imageKit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder: "/blogs"

        })
        // optimization through imagekit URL transformation
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation:[
                {quality:'auto'},//Auto compression
                {format:'webp'},//convert to modern format 
                {width:'1280'} // width resizing
            ]
        });

        const image = optimizedImageUrl;
        

        await Blog
        


    } catch (error) {
        
    }
}