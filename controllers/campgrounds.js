const Campground = require('../models/campground'); // Wednesday February 1st 2023 4:44pm

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => { // Wednesday February 1st 2023 5:03pm
    res.render('campgrounds/new');
 }

module.exports.createCampground = async (req, res, next) => { // Wednesday February 1st 2023 4:56pm
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id;
    await campground.save();
    req.flash('success', 'Successfully made a new campground!');
    res.redirect(`/campgrounds/${campground._id}`)
} //Maybe keep this one Friday February 10, 2023

/*module.exports.campgroundID =  async (req, res,) => {// Wednesday February 1st 2023 4:34pm
    // const {id} = req.params; Mistakenly made this Friday January 6th, 2023
    const campground = await Campground.findById(req.params.id).populate ({ //('reviews').populate('author'); I think I should've moved this instead. //Tuesday January 13th, 2023 4:42pm
    path: 'reviews', 
        populate: {
            path: 'author'
        }
    }).populate('author');   
    //console.log(campground);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
}*/

module.exports.showCampground = async (req, res,) => { // Wednesday February 1st 2023 5:10 pm
    const campground = await Campground.findById(req.params.id).populate ({ //('reviews').populate('author'); I think I should've moved this instead. //Tuesday January 13th, 2023 4:42pm
    path: 'reviews', 
        populate: {
            path: 'author'
        }
    }).populate('author');   
   // console.log(campground);
    if(!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm =  async (req, res) => { // Wednesday February 1st 2023 5:25pm
    const { id} = req.params;
    const campground = await Campground.findById(id);
    if (!campground) { 
        req.flash('error', 'You cannot find that campground!');
        return res.redirect(`/campgrounds`); ///${id}
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground =  async (req, res) => { // Wednesday February 1st 2023 5:30m
    const {id} = req.params;//
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); //, {new:true} ground
    req.flash('success', 'Successfully updated campground!');
    res.redirect( `/campgrounds/${campground._id}`)
 }
 module.exports.deleteCampground =  async (req, res) => {// Wednesday February 1st 2023 5:34pm
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);//G
    req.flash('success', 'Successfully deleted review')
    res.redirect('/campgrounds');
 }