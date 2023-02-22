const User = require('../models/user'); //Thursday February 2nd  2023 4:56pm

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}
module.exports.register = async (req, res, next) => { //Thursday February 2nd 5:10 pm
    try {
        const { email, username, password} = req.body;
        const user = new User({ email, username});//Added Thursday January 12th, 2023 5:28pm
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
        req.flash('success', 'Welcome to Yelp Camp!'); 
        res.redirect('/campgrounds');
    })
    } catch (e) {
        req.flash('error', e.message); //Thursday February 2nd  2023 5:10pm
        res.redirect('register');
    }
}

module.exports.renderLogin = (req, res) => {//Thursday February 2nd  2023 5:12pm
    res.render('users/login');
}

module.exports.login = (req, res) => { //Thursday February 2nd  2023 5:15pm
    req.flash('success', 'welcome back!'); //What's good y'all. WELCOME BACK!
    const redirectUrl = req.session.returnTo || '/campgrounds'; 
    delete req.session.returnTo;
    res.redirect(redirectUrl);
   }
/**/ 
module.exports.logout =  ( req, res) => { //Thursday February 2nd  2023 5:25pm
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
}