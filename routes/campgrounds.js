const express = require('express'); //Monday October 31st 2022 4:12pm
const router = express.Router();
const campgrounds = require('../controllers/campgrounds'); // Wednesday February 1st 2023 4:44pm
const catchAsync = require('../utils/catchAsync'); //Tuesday November 1st, 2022 4:39pm
//const ExpressError = require('../utils/ExpressError');
//const { campgroundSchema} = require('../schemas.js'); //, reviewSchema 
const { isLoggedIn, isAuthor, validateCampground } = require ('../middleware'); // added Monday December 19th, 2022 4:38pm.
const multer = require('multer'); //Friday February 24th, 2023 5:20pm
const { storage } = require('../cloudinary'); // Wednesday March 1st 2023 4:26pm
const upload = multer({ storage }); //Friday February 24th, 2023 5:20pm //March 8th, 2023 5:13pm removed this dest: 'uploads/'

const Campground = require('../models/campground');
//const { route, put } = require('./reviews');

router.route('/')
    .get(catchAsync(campgrounds.index)) // moved Friday February 3rd, 2023 4:38pm
    .post( isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground)); // copied and added Wednesday February 1st, 2023 5:03pm //
     //Upload the image first and then the campground Thursday march 2nd, 2023 4:56pm
    /*.post(upload.array('image'), (req, res) => { //Friday February 24th, 2023 5:25pm You can add an array to give you multiple files.
        console.log(req.body, req.file); //Friday February 24th, 2023 5:20pm
        res.send("It Worked?!?")//Friday February 24th, 2023 5:20pm
    })*/
router.get('/new', isLoggedIn, campgrounds.renderNewForm);// moved  Friday February 3rd, 2023 4:44pm

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground)) // copied and added Friday February 3rd, 2023 4:45pm
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground)) // copied and added Wednesday February 1st, 2023 4:58pm //Are you the author? Are you logged in? Let's validate that. Okay, you are good to go. Now upload a image Monday March 20th, 2023 4:30pm
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground)); // copied and added Wednesday February 1st, 2023 5:05pm // Tuesday February 7th, 2023 4:30 pm I forgot the isauthor part.

 router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)); // copied and added Wednesday February 1st, 2023 4:58pm Commented outFriday February 3rd, 2023 4:53pm

module.exports = router;


/* const validateCampground = (req, res, next) => { //Tuesday November 1st, 2022 4:40pm
    const { error }  = campgroundSchema.validate(req.body); 
         if (error) {
            const msg = error.details.map(el => el.message).join(',') //I had to add this
            throw new ExpressError(msg, 400) 
         } else {
            next();
         }
 }  
 
 const isAuthor = async (req, res, next) => {
    const { id} = req.params; //<!-- Monday January 28th 2022 4:56pm-->
    const campground = await Campground.findById(id);//
    if (!campground.author.equals(req.user._id)) { //If you do ont own the campground
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
 }*/

// router.get('/', catchAsync(campgrounds.index)); // copied Wednesday February 1st 2023 4:21pm Commented outFriday February 3rd, 2023 4:53pm
/*router.get('/', catchAsync( async (req, res) => {//campgrounds
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
/));}*/

//router.get('/new', isLoggedIn, campgrounds.renderNewForm);// copied and added Wednesday February 1st, 2023 4:53pm Commented outFriday February 3rd, 2023 4:53pm

 //isLoggedIn added Monday December 19th, 2022 4:38pm.
/*router.get('/new', isLoggedIn, (req, res) => {// May 5th, 2022 4:44pm //catchAsync( async /campgrounds
   res.render('campgrounds/new');//{}  last edited May 24th, 2022 today June 21st, 2022
})//There was the / that was in front of the campgrounds.)
*/
//router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground)); // copied and added Wednesday February 1st, 2023 4:56pm Commented outFriday February 3rd, 2023 4:53pm
// Thursday May 5, 2022 5:04pm , 12/19/2022 added //Friday August 5th, 2022 5:55pm? It appears I've misspelled 'catch async.' it was typed: cactchAsync 
/*router.post('/', isLoggedIn, validateCampground, catchAsync( async (req, res, next) => { //Friday July 22nd 2022 5:01pm campgrounds
    // if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id; //Tuesday January 3rd, 2023 4:52pm-->
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
})) */
//router.get('/:id', catchAsync(campgrounds.showCampground)); // copied and added Wednesday February 1st, 2023 4:57pm Commented outFriday February 3rd, 2023 4:53pm
/*
router.get('/:id', catchAsync( async (req, res,) => {//campgrounds //isLoggedIn, 12/20/2022 5:06pm
    // const {id} = req.params; Mistakenly made this Friday January 6th, 2023
    const campground = await Campground.findById(req.params.id).populate ({ //('reviews').populate('author'); I think I should've moved this instead. //Tuesday January 13th, 2023 4:42pm
    path: 'reviews', //added Friday January 13th, 2023 4:34 pm
        populate: {
            path: 'author'
        }
    }).populate('author');   
    console.log(campground);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));*/

/*router.get('/:id', catchAsync( async (req, res,) => {//campgrounds //isLoggedIn, 12/20/2022 5:06pm
    // const {id} = req.params; Mistakenly made this Friday January 6th, 2023
    const campground = await Campground.findById(req.params.id).populate ({ //('reviews').populate('author'); I think I should've moved this instead. //Tuesday January 13th, 2023 4:42pm
    path: 'reviews', //added Friday January 13th, 2023 4:34 pm
        populate: {
            path: 'author'
        }
    }).populate('author');   
    console.log(campground);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}));*/
// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm)); // copied and added Wednesday February 1st, 2023 4:58pm Commented outFriday February 3rd, 2023 4:53pm
                                    // Offers SPecific feedback January 11, 2023 4:25pm?
/*router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync( async (req, res) => {////campgrounds
    const { id} = req.params;
    const campground = await Campground.findById(id);//const campground = await Campground.findById(req.params.id)
    if (!campground) { //If you do ont own the campground
        req.flash('error', 'You cannot find that campground!');
        return res.redirect(`/campgrounds/${id}`);
    }
    res.render('campgrounds/edit', { campground });//Moved Friday January 13th, 2023 4:29 pm
}));*/
    /*if (!campground.author.equals(req.user._id)) { //If you do ont own the campground
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }*/
 /*
*/

//router.put('/:id', isLoggedIn, validateCampground, catchAsync(campgrounds.updateCampground)); // copied and added Wednesday February 1st, 2023 5:03pm

 /*
router.put('/:id', isLoggedIn, validateCampground, catchAsync( async (req, res) => {// Wednesday May 11th 2022 4:44pm ///campgrounds
    const {id} = req.params;//
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); //, {new:true} ground
    req.flash('success', 'Successfully updated campground!');
    res.redirect( `/campgrounds/${campground._id}`)
 })); */
    /*const campground = await Campground.findById(id);// Wednesday January 25th, 2023 4:36pm commeted out this.
    if (!campground.author.equals(req.user._id)) { //If you do ont own the campground
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }*/// 1-6-2022
  
    //router.delete('/:id', isLoggedIn, catchAsync(campgrounds.deleteCampground)); // copied and added Wednesday February 1st, 2023 5:05pm Commented outFriday February 3rd, 2023 4:53pm
/*
router.delete('/:id', isLoggedIn, catchAsync( async (req, res) => {// 5/5/2022 4:44pm ///campgrounds
    const {id} = req.params;// Wednesday May 11th 2022 4:44pm
    await Campground.findByIdAndDelete(id);//G
    req.flash('success', 'Successfully deleted review')
    res.redirect('/campgrounds');
 }));
*/
 // module.exports = router; Commented outFriday February 3rd, 2023 4:53pm