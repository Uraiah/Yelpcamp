const mongoose = require('mongoose'); //Wednesday October 5th, 2022 4:20 pm
const  Schema = mongoose.Schema;

const reviewSchema = new Schema({
    body: String,
    rating : Number,
    author: { //Added Friday January 13th, 2023 4:58 pm
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model("Review", reviewSchema);