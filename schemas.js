//const Joi = require('joi'); // Thursday July 28th 2022 4:20PM
//const { number } = require('joi'); // Thursday October 13th, 2022 4:31pm
const BaseJoi = require('joi'); //Added Wednesday June 14th, 2023 4:34pm
const sanitizeHtml = require('sanitize-html'); // Wednesday  June 14th, 2023 4:47pm
const extension = (joi) => ({ //Added Tuesday June 13th, 2023 5:30pm
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)
module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(), //Added escapeHTML Wednesday  June 14th, 2023 4:37pm
        price: Joi.number().required().min(0),
       // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(), //Added escapeHTML Wednesday  June 14th, 2023 4:43pm,
        description: Joi.string().required().escapeHTML() //Added escapeHTML Wednesday  June 14th, 2023 4:44pm
    }).required(),
    deleteImages: Joi.array() //Friday March 24th, 2023 4:54 pm
 });

 module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML() //Added Tuesday June 13th, 2023 5:37pm
        //body: Joi.string().required()
    }).required() //Tuesday October 11th, 2022 4:22pm
 }) //f48edadec25e7ab5213e5a2a6a034eec.jpg