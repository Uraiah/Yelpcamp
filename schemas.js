const Joi = require('joi'); // Thursday July 28th 2022 4:20PM
const { number } = require('joi'); // Thursday October 13th, 2022 4:31pm

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
 });

 module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required() //Tuesday October 11th, 2022 4:22pm
 }) //f48edadec25e7ab5213e5a2a6a034eec.jpg