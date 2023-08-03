const mongoose = require('mongoose'); //Monday April 18th 2022 4:46 pm
const Review = require('./review')
const Schema = mongoose.Schema; //Summon Mongoose
//const express = require('express');

const ImageSchema = new Schema({// Monday March 27th, 2023 4:58pm
    url: String, //It  has a file and a string
    filename: String //Stores the file name.
});

ImageSchema.virtual('thumbnail').get(function () {// Monday March 27th, 2023 4:58pm
    return this.url.replace('/upload', '/upload/w_200');  //We don't need to store this model. It is drrived from the original image
});

const opts = {toJSON: { virtuals: true } }; //Added Friday May 26th, 2023 5:08pm

///this refers to a specific image
const CampgroundSchema = new Schema({
    title: String,
    //image: String, //Tuesday May 31st 2022 4:39pm changed
    images: [ImageSchema], //Wednesday April 26th, 2023 4:57pm
    geometry: {
          type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
        }, //Added Wednesday April 26th, 2023 5:09pm
     /* [//Changed the image into an array March 2nd, 2023 4:46pm
        {
            url: String, //Stores the Url
            filename: String //Stores the file name.
        }
    ], */
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
   ] //Ops was added friday May 26th, 2023 4:43pm
}, opts); //Query Loading Ware // Wednesday October 17, 2022 5:00pm


CampgroundSchema.virtual('properties.popUpMarkup').get(function () {//Added hursday June 1st? 2023 4:24pm I think so I accidently saved after I deleated the comment
    return ` 
    <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>` 
});

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