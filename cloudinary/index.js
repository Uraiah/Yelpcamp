const cloudinary = require('cloudinary').v2;  //Tuesday February 28th, 2023 5:28pm 
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 

cloudinary.config({// Wednesday March 1st 2023 5:06pm
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET //'Secret' removed Thursday March 16th, 2023 4:16pm
 });   

const storage = new CloudinaryStorage ({
    cloudinary,
    params: {
        folder: 'YelpCamp',
    allowedFormats: ['jpeg', 'png', 'jpg']
    }
    
});

module.exports = {
    cloudinary,
    storage
}
/*    =
    =
    =*/