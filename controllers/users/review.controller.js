const catchAsync = require("../../utils/catchAsync");
const {Review, Driver} = require("../../models");
const AppError = require("../../utils/appError");

exports.reviewDriver = catchAsync(async(req,res,next)=>{
    const driver = await Driver.findOne({where: {id: req.params.id}});
    if(!driver)
        return next(new AppError("Driver not found", 404));
    const review = await Review.findOne({where: {userId: req.user.id, driverId: req.params.id}});
    if(review)
        return next(new AppError("You are already rated this driver", 403));
    const {point} = req.body;
    if(!point)
        return next(new AppError("Please provide point"));
    const newReview = await Review.create({
        userId: req.params.id,
        driverId: req.params.id,
        point: point
    });
    return res.status(201).send(newReview);
})