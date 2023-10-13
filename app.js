if (process.env.NODE_ENV != "production") { //Tuesday February 28th, 2023 4:28pm 
    require('dotenv').config(); //This is an environment variable. // Wednesday March 1st 2023 4:26pm
}

console.log(process.env.SECRET) //Tuesday February 28th, 2023 4:41pm 
console.log(process.env.API_key) //Tuesday February 28th, 2023 4:41pm 

const express = require('express'); //Tuesday April 12th 2022 5:13 pm
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override'); //Monday July 25th, 2022 5:09pm
const passport = require('passport'); //Moved here THursday January 5th 2023 4:31 PM
const LocalStrategy = require('passport-local');
const User = require('./models/user'); //Tuesday November 29th, 2022 4:57pm
const helmet = require('helmet'); //Thursday June 15th, 2023 4:36pm

//const passport = require('passport'); //This was here THursday January 5th 2023 4:31 PM
const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds'); //changed from campgrounds //Tuesday November 29th, 2022 5:01pm
const reviewRoutes = require('./routes/reviews'); //changed from routes //Tuesday November 29th, 2022 5:01pm // Apparently this './models/review' was the cause of the problem. Tuesday February 21st, 2023 5:25 pm

//const MongoDBStore = require('connect-mongo');//(session); //Monday June 26th, 2023 4:48pm

const mongoSanitize = require('express-mongo-sanitize'); //Added June 12th, 2023 4:39pm
const MongoStore = require('connect-mongo'); // Un-commented June 28th, 2023 4:36pm
//const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp'; //Monday June 26th, 2023 
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/yelp-camp'; //Monday September 18th, 2023 4:32pm
//const dbUrl = process.env.DB_URL //Added Friday June 23rd, 2023 5:09pm
//mongoose.connect('mongodb://localhost:27017/yelp-camp', {//Moved this on Friday June 23rd, 2023 5:11pm dbUrl
/*mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true, //I left out the 'i' Thursday August 4th, 2022 5:08 PM
    useFindAndModify: false
});*/
console.log(`Database connection string currently set to: ${process.env.DB_URL}`); //Added Tuesday October 10th, 2023 4:44pm
mongoose.set('strictQuery', true);
mongoose.connect(dbUrl);//Monday September 18th, 2023 4:32pm

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true } )); //Parse the body shows the information in a place. 
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

// To remove data using these defaults, or, to replace these prohibited characters with _, use:
app.use( //Friday June 9th, 2023 4:46pm
    mongoSanitize({
      replaceWith: '_',
    }),
  );

  const secret = process.SECRET || 'thisshouldbeabettersecret!'; //Added either or password to activate the password Thursday June 29th, 2023 4:44pm
//Wednesday June 28th, 2023 4:30pm I removed MongoDBStore and added MongoStore.create
  const store = MongoStore.create({ //Monday June 26th, 2023 5:22pm  removed new on June 28th, 2023 4:41pm
    mongoUrl: dbUrl, // I changed the url into mongoUrl June 28th, 2023 4:47pm

    touchAfter: 24 * 60 * 60,
    crypto: {
            secret, //: 'thisshouldbeabettersecret!',
    }
  });

  store.on("error", function (e) { // Added and e is a print Tuesday June 27th, 2023 4:40pm 
    console.log("SESSION STORE ERROR", e)
  }) 

const sessionConfig = { //Monday November 7th, 2022 5:05pm
    store, //Stores the informmation, probably Tuesday June 27th, 2023 4:44pm 
    name: 'session', // //Removed password Thursday June 29th, 2023 4:54pm
    secret, //: 'thisshouldbeabettersecret!', //Removed password Thursday June 29th, 2023 4:54pm
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true, //Friday January 27th 2022 4:43 pm added this one.
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 *  60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());
app.use(helmet({ contentSecurityPolicy: false})); //Thursday June 15th, 2023 5:09pm
//Friday June 16th, 2023 4:52pm
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dm4lfb0xf/", // I added the link to my cloudinart account That is what I missed Thursday June 22nd, 2023 5:09pm //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! colts' account douqbebwk
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

//Tuesday November 29th, 2022 4:30pm
app.use(passport.initialize()); //Hello Passport
app.use(passport.session()); //We would like to use your passport
passport.use(new LocalStrategy(User.authenticate())); //Allow use?

passport.serializeUser(User.serializeUser()); //Added Thursday December 15th, 2022 5:21pm
passport.deserializeUser(User.deserializeUser()); //This, and the last code may have been the reason the code wasn't working 

app.use((req, res, next) => { //When you flash something, it would show a message.
    console.log(req.query); //Friday June 9th, 2023 4:46pm
    //console.log(req.session) //Friday December 23rd 2022 4:44 pm //Prints the entire session.
    res.locals.currentUser = req.user; //Thursday December 22nd 2022 4:51pm
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
//Tuesday November 29th, 2022 4:16pm
app.get('/fakeUser', async (req, res)=> {
    const user = new user({email: 'coltttt@gmail.com', username: 'colttt'});
    const newUser = await user.register(user, 'chicken'); //Pass in user object and password
    res.send(newUser);
})

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res)=> {
res.render('home')
}); // Monday May 2, 2022 4:59pm 


 app.all('*', (req, res, next) => {
    next(new ExpressError('Page Is Not Found', 404))
 }) //Monday July 25th, 2022 5:05pm

//Friday July 22nd 2022 4:30pm
 app.use((err, req, res, next) => { //Monday July 25th, 2022 5:05pm
    const { statusCode = 500 } = err; //, message =
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
   res.status(statusCode).render('error', { err }); //send(message)
    //res.send('Oh boy, something went wrong!')
 })

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

// az3GqoOcEJPSAWGl Friday June 23rd, 2023 5:04pm mongodb+srv://our-first-user:<password>@cluster0.cqutyyk.mongodb.net/?retryWrites=true&w=majority
//const { campgroundSchema, reviewSchema } = require('./schemas.js');
//const Campground = require('./models/campground');
//const Review = require('./models/review');
//const catchAsync = require('./utils/catchAsync');
//const campgrounds = require('./models/campgrounds');
//const review = require('./models/review');
//const {transcode} = require('buffer');
//const Joi = require('joi'); //Wednesday July 27th 2022 4:23 pm

/*
const validateCampground = (req, res, next) => { //Didn't add the '>' sign
    const { error }  = campgroundSchema.validate(req.body); 
         if (error) {
            const msg = error.details.map(el => el.message).join(',') //I had to add this
            throw new ExpressError(msg, 400) //result.error.details
         } else {
            next();
         }
 }   */

    //const campgroundSchema = Joi.object({ //Passes data to schema
     /*const validateReview = (req, res, next) => {
        const {error} = reviewSchema.validate(req.body); //Tuesday October 11th, 2022 4:12pm
        if (error) {
           const msg = error.details.map(el => el.message).join(',') //I had to add this
           throw new ExpressError(msg, 400) //result.error.details
        } else {
           next();
        }
     }*/

     
    
//console.log(result);
 

/*
app.get('/campgrounds', catchAsync( async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}));
app.get('/campgrounds/new', (req, res) => {// May 5th, 2022 4:44pm //catchAsync( async 
   res.render('campgrounds/new');//{}  last edited May 24th, 2022 today June 21st, 2022
})//There was the / that was in front of the campgrounds.)

// Thursday May 5, 2022 5:04pm  //Friday August 5th, 2022 5:55pm? It appears I've misspelled 'catch async.' it was typed: cactchAsync 
app.post('/campgrounds', validateCampground, catchAsync( async (req, res, next) => { //Friday July 22nd 2022 5:01pm
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})) 
   /* const campgroundSchema = Joi.object({ //Passes data to schema
        campground: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            image: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required()
        }).required()
         })
         const result = campgroundSchema.validate(req.body); 
         if (result.error) {
            throw new ExpressError(result.error.details, 400)
         }
    console.log(result); */
     

            /*campground: Joi.object({
                //title: Joi.object({
                     })
    })*/
      
/* try{} catch (e) {
    next(e)
}*/


/*app.post('/campgrounds', async (req, res)=> {
    res.send(req.body);
})
app.get('/campgrounds/:id', catchAsync( async (req, res,) => {
    const campground = await Campground.findById(req.params.id)//
    res.render('campgrounds/show', { campground });
}));

app.get('/campgrounds/:id/edit', catchAsync( async (req, res) => {///
    const campground = await Campground.findById(req.params.id)//
    res.render('campgrounds/edit', { campground });
}));*/
 /*app.get('/makecampground', async (req, res) => {// 4/18/2022 5:25pm
    const camp = new Campground({ title: 'My backyard', description: 'cheap camp'});
    await camp.save();
    res.send(camp){}
})*/
/*
app.put('/campgrounds/:id', validateCampground, catchAsync( async (req, res) => {// Wednesday May 11th 2022 4:44pm
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); //, {new:true}
    res.redirect( `/campgrounds/${campground._id}`)
 }));
app.delete('/campgrounds/:id', catchAsync( async (req, res) => {// 5/5/2022 4:44pm
    const {id} = req.params;// Wednesday May 11th 2022 4:44pm
    await Campground.findByIdAndDelete(id);//G
    res.redirect('/campgrounds');
 }));
 //Friday October 7th, 2022 4:41pm //Tuesday October 11th, 2022 4:16pm
 app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res)=> {
    const campground = await Campground.findById(req.params.id);  //res.send('YOU MADE IT!!!')
    const review = new Review(req.body.review)
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
 }))

 app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync( async (req, res) => {// 5/5/2022 4:44pm
    const {id, reviewId} = req.params;// Wednesday May 11th 2022 4:44pm
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});//G
    await Review.findByIdAndDelete(reviewId); //req.params.
    res.redirect(`/campgrounds/${id}`); // Thurssday October 11th 2022 4:44pm
        //res.send("DELETE ME!!");G
 })); */

 //every single request this will run if nothing else is matched first


/* 

const validateCampground = (req, res, next) = {
    const campgroundSchema = Joi.object({ //Passes data to schema
        campground: Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            image: Joi.string().required(),
            location: Joi.string().required(),
            description: Joi.string().required()
        }).required()
         })*/