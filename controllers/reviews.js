const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.deleteReview = async (req, res) => {
    const { reviewID,id } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews:reviewID } });
    await Review.findByIdAndDelete(reviewID);
    req.flash('success', 'Succesfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}
module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Succesfully created new review')
    res.redirect(`/campgrounds/${campground._id}`)
}
