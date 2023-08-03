const mongoose = require('mongoose'); //Tuesday April 20th 2022 4:44pm
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');//I forgot to add this one. 4/27/2022
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) { // Friday April 22nd 2022 4:44-5:13pm // added 200 and removed 50. Tuesday MAy 23rd, 2023 4:54pm
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b4a1d89cfa4d4ca85f5627' ,//, '5f5c330c2cd79d538f2c66d9' 63c7189352fe956154d925a2 '63d59b91a5143242b0e84c46'
            location: `${cities[random1000].city},'63cf0586526b114fe8dc0627' ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251', //Tuesday May 31st 2022 4:39pm
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolorum laudantium accusamus minima facilis nam asperiores placeat. Aspernatur, dolore suscipit perferendis enim soluta, maxime quos exercitationem, cum commodi nam dicta.',
            price, 
             geometry: { //Added Wednesday May 3rd, 2023 5:04pm At line 26, see if you can remove the numberline 5/18/2023 4:43pm
              type: "Point", //Friday  May 5th, 2023 4:52pm
              //coordinates: [-113.1331, 47.0202] } , //Added Wednesday May 3rd, 2023 5:04pm
              coordinates:[ //Added Thursday May 11th, 2023 5:13pm
                  cities [random1000].longitude,
                  cities[random1000].latitude,
              ] 
               } ,
            images: [
                {
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1690924237/YelpCamp/kernchsljxezzk7vxekc.jpg',
                  filename: 'YelpCamp/kernchsljxezzk7vxekc'
            
                },  
                {
                  //_id: 6410e2ba62a1356a3c03e21e,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828216/YelpCamp/fagygt9nhcvzpxhhv2n2.jpg',
                  filename: 'YelpCamp/fagygt9nhcvzpxhhv2n2'
                },
                {
                 // _id: 6410e2ba62a1356a3c03e21f,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828216/YelpCamp/unm3bm0k5ekpcpb3orfe.jpg',
                  filename: 'YelpCamp/unm3bm0k5ekpcpb3orfe'
                },
                {
                 // _id: 6410e2ba62a1356a3c03e220,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828217/YelpCamp/rfuwb9ysprb3q6myvq2s.jpg',
                  filename: 'YelpCamp/rfuwb9ysprb3q6myvq2s'
                },
                {
                  //_id: 6410e2ba62a1356a3c03e221,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828217/YelpCamp/dcfvkmiprr2yr9i3uhtk.jpg',
                  filename: 'YelpCamp/dcfvkmiprr2yr9i3uhtk'
                },
                {
                  //_id: 6410e2ba62a1356a3c03e222,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828218/YelpCamp/tqfto0eseegm1euuu4aw.jpg',
                  filename: 'YelpCamp/tqfto0eseegm1euuu4aw'
                },
                {
                  //_id: 6410e2ba62a1356a3c03e223,
                  url: 'https://res.cloudinary.com/dm4lfb0xf/image/upload/v1678828218/YelpCamp/t2c5mnumstrovtmar9n8.jpg',
                  filename: 'YelpCamp/t2c5mnumstrovtmar9n8'
                }                      
              ],
            //https://placeimg.com/ https://unsplash.com/collections/483251/in-the-woods
        })//https://unsplash.com/collections/483251
        //const c = new Campground({title: 'purple field'});
    await camp.save();//https://images.unsplash.com/photo-1465308452258-70fc6a9b67a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY1NDExNTE5NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080
    }
}

seedDB().then(() => { //Monday May 2nd 2022 4:52pm?
    mongoose.connection.close();
});