const Campground = require('../models/campground'); // Wednesday February 1st 2023 4:44pm
const { cloudinary } = require("../cloudinary"); //Thursday March 9th, 2023 5:25pm
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");  //Monday April 24th, 2023 5:48pm
const mapBoxToken = process.env.MAPBOX_TOKEN;  //Passing in token 
const geocoder = mbxGeocoding({ accessToken: mapBoxToken}); //Monday April 24th, 2023 5:48pm


module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}

module.exports.renderNewForm = (req, res) => { // Wednesday February 1st 2023 5:03pm
    res.render('campgrounds/new');
 }

module.exports.createCampground = async (req, res, next) => { // Wednesday February 1st 2023 4:56pm
    const geoData = await geocoder.forwardGeocode({ //Tuesday April 25th, 2023 5:14pm
        query: req.body.campground.location,  //'Yosemite, CA',
        limit: 1
    }).send()
/*    console.log(geoData); /Tuesday April 25th, 2023 5:14pm
    res.send(geoData.body.features[0].geometry);//"OK!!!"*/

    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry; //April 27th, 2023 4:56pm Added geometry and file name for the author.
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename })); //Thursday march 2nd, 2023 4:56pm
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
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
        return res.redirect('/campgrounds' ); ///${id}//  I removed this `` on the line. I must've confused the quotes Tuesday March 28th, 2023 4:35pm
    }
    res.render('campgrounds/edit', { campground });
}

module.exports.updateCampground =  async (req, res) => { // Wednesday February 1st 2023 5:30m
    const {id} = req.params;//
    console.log(req.body); //Friday March 24th, 2023 4:45 pm check the log
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}); //, {new:true} ground
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));  //Friday March 17thth, 2023 4:56pm
    campground.images.push(...imgs);//Spread operator Monday March 20th, 2023 4:44pm//(req.files.map(f => ({ url: f.path, filename: f.filename }))); // this is now an array.
    await campground.save(); //Monday March 20th, 2023 4:46pm
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename); // Monday March 27th, 2023 4:58pm
        }
        await campground.updateOne({ $pull: {images: {filename: {$in: req.body.deleteImages}}}})
        //console.log(campground)
    } //Friday March 24th, 2023 5:12 pm
    req.flash('success', 'Successfully updated campground!');
    res.redirect( `/campgrounds/${campground._id}`)
 }
 module.exports.deleteCampground =  async (req, res) => {// Wednesday February 1st 2023 5:34pm
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);//G
    req.flash('success', 'Successfully deleted campground')// I removed 'review' and added campground Tuesday March 28th, 2023 4:58pm
    res.redirect('/campgrounds');
 }