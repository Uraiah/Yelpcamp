const express = require('express'); //Tuesday November 29th, 2022 4:50pm
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
//const { remove } = require('../models/user');

router.route('/register')
.get(users.renderRegister) // copied Monday February 6th  2023 5:51pm //'/register',
.post(catchAsync(users.register)); // copied Monday February 6th  2023 5:51pm

router.route('/login')
.get(users.renderLogin) // copied Monday February 6th  2023 5:51pm
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login); // copied Monday February 6th  2023 5:51pm //router '/login', 

router.get('/logout', users.logout); // copied Monday February 6th  2023 5:51pm

module.exports = router; //Copied Monday February 6th  2023 5:51pm

/*router.get('/register', (req, res) => {
    res.render('users/register');
});*/ //Monday December 5th, 2022 4:50pm

//router.post('/register', catchAsync(users.register)); // copied Thursday February 2nd  2023 5:10pm
/*router.post('/register', catchAsync(async (req, res, next) => {
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
        req.flash('error', e.message); //I put res instead
        res.redirect('register');
    }
   // res.send(req.body)
}));*/

//router.get('/login', users.renderLogin); // copied Thursday February 2nd  2023 5:11pm
//Tuesday December 6th, 2022 4:50pm
/*router.get('/login', (req, res) => {// This serves as a form
    res.render('users/login');
}) */

//router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), users.login); // copied Thursday February 2nd  2023 5:20pm
                              //This takes you to the login If it's a failure it gets redirected
/*router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login' }), (req, res) => { //this makes sure your creditials are valid.
 req.flash('success', 'welcome back!'); //What's good y'all. WELCOME BACK!
 const redirectUrl= req.session.returnTo || '/campgrounds'; //Friday December 23rd 2022 4:44 pm //It's possible that there is no return to. Tues, 12/27/2022
 delete req.session.returnTo;
 res.redirect(redirectUrl);//'' /campgrounds //Moved Friday January 13th, 2023 4:14 pm
})*/

//router.get('/logout',users.logout); // copied Thursday February 2nd  2023 5:25pm
// Monday December 12th, 2022 4:39 PM
/*router.get('/logout', ( req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/campgrounds');
})*/
//module.exports = router; //Made a mistake with users