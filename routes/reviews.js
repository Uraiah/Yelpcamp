const express = require('express'); //Monday October 31st 2022 4:40pm
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware'); // Monday January 9th, 2023 5:11pm
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews'); // Thursday February 2nd 2023 4:44 pm
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
//const { reviewSchema } = require('../schemas.js');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview)) // Thursday February 2nd 2023 4:39 pm
 router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview)); 


 module.exports = router;
 
/*const validateReview = (req, res, next) => {
   const {error} = reviewSchema.validate(req.body); //Tuesday October 11th, 2022 4:12pm
   if (error) {
      const msg = error.details.map(el => el.message).join(',') //I had to add this
      throw new ExpressError(msg, 400) //result.error.details
   } else {
      next();
   }
}*/
 //Friday October 7th, 2022 4:41pm //Tuesday November 1st, 2022 4:16pm
 //router.post('/:id/reviews', validateReview, catchAsync(async (req, res)=> { ///campgrounds
/* router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res)=> { ///campgrounds
    const campground = await Campground.findById(req.params.id);  //res.send('YOU MADE IT!!!')
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
 }))*/

 // Thursday February 2nd 2023 4:40 pm

// router.delete('/:id/reviews/:reviewId', catchAsync( async (req, res) => {// 11/1/2022 5:06pm /campgrounds
 /*  router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync( async (req, res) => {// Tuesday January 10th, 2023 5:06pm
    const {id, reviewId} = req.params;// Wednesday May 11th 2022 4:44pm
    await Campground.findByIdAndUpdate(id, { $pull: {reviews: reviewId}});//G
    await Review.findByIdAndDelete(reviewId); //req.params.
    req.flash('success', 'Successfully deleted review') //Added Tuesday  January 24th 2023 4:48 pm
    res.redirect(`/campgrounds/${id}`); // Thurssday October 11th 2022 4:44pm
 }));*/

