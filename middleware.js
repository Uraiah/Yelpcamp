const { campgroundSchema, reviewSchema } = require('./schemas.js'); //Added ReviewSchema and removed a period Thursday January 5th, 2023 5:03pm
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review'); // Thursday January 5th, 2023 5:07pm

module.exports.isLoggedIn = (req, res, next) => {//Monday December 19th, 2022 4:28pm.
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        // console.log(req.path, req.originalUrl) // Friday December 23rd 2022 4:39 pm
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
} 
module.exports.validateCampground = (req, res, next) => { //Tuesday November 1st, 2022 4:40pm
    const { error }  = campgroundSchema.validate(req.body); 
         if (error) {
            const msg = error.details.map(el => el.message).join(',') //I had to add this
            throw new ExpressError(msg, 400) 
         } else {
            next();
         }
 } 
   // Moved Monday January 28th 2022 4:56pm
 module.exports.isAuthor = async (req, res, next) => {
    const { id} = req.params; //<!-- Monday January 28th 2022 4:56pm-->
    const campground = await Campground.findById(id);//
    if (!campground.author.equals(req.user._id)) { //If you do ont own the campground
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
 }
//Wednesday January 11th 2023 4:49 pm.
 module.exports.isReviewAuthor = async (req, res, next) => {
   const { id, reviewId } = req.params; //This Destablizes the review.<!-- Wednesday January 11th 2023 4:51 pm.-->
   const review = await Review.findById(reviewId);//
   if (!review.author.equals(req.user._id)) { //If you do ont own the campground
       req.flash('error', 'You do not have permission to do that!');
       return res.redirect(`/campgrounds/${id}`);
   }
   next();
}
module.exports.validateReview = (req, res, next) => { //I missed the period. Modified  Friday January 13th, 2023 4:58 pm
    const {error} = reviewSchema.validate(req.body); //Tuesday October 11th, 2022 4:12pm
    if (error) {
       const msg = error.details.map(el => el.message).join(',') //I had to add this
       throw new ExpressError(msg, 400) //result.error.details
    } else {
       next();
    }
 }