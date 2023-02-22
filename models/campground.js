const mongoose = require('mongoose'); //Monday April 18th 2022 4:46 pm
const Review = require('./review')
const Schema = mongoose.Schema; //Summon Mongoose
//const express = require('express');
const CampgroundSchema = new Schema({
    title: String,
    image: String, //Tuesday May 31st 2022 4:39pm changed
    price: Number, //String,
    description: String,
    location: String,
    //Adding a field that is a user ID then you can look it up for each campground. 
    author: // Wednesday October 5, 2022 4:24pm
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   reviews:[ // Wednesday October 5, 2022 4:24pm
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
   ] 
}); //Query Loading Ware // Wednesday October 17, 2022 5:00pm

CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews //$in:  
            }
        })
       } 
    })

module.exports = mongoose.model('Campground', CampgroundSchema);