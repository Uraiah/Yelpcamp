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
    for (let i = 0; i < 50; i++) { // Friday April 22nd 2022 4:44-5:13pm
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63b4a1d89cfa4d4ca85f5627' ,//, '5f5c330c2cd79d538f2c66d9' 63c7189352fe956154d925a2 '63d59b91a5143242b0e84c46'
            location: `${cities[random1000].city},'63cf0586526b114fe8dc0627' ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251', //Tuesday May 31st 2022 4:39pm
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolorum laudantium accusamus minima facilis nam asperiores placeat. Aspernatur, dolore suscipit perferendis enim soluta, maxime quos exercitationem, cum commodi nam dicta.',
            price, //https://placeimg.com/ https://unsplash.com/collections/483251/in-the-woods
        })//https://unsplash.com/collections/483251
        //const c = new Campground({title: 'purple field'});
    await camp.save();//https://images.unsplash.com/photo-1465308452258-70fc6a9b67a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY1NDExNTE5NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080
    }
}

seedDB().then(() => { //Monday May 2nd 2022 4:52pm?
    mongoose.connection.close();
});