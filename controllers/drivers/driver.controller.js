const catchAsync = require("../../utils/catchAsync");
const {Driver, Review} = require("../../models");
const AppError = require("../../utils/appError");


exports.getProfile = catchAsync(async(req,res,next)=>{
    const driver = await Driver.findOne({where: {id: req.user.id}});
    if(!driver)
        return next(new AppError("Driver not found", 404));
    const {count, rows} = await Review.findAndCountAll({where: {driverId: driver.id}});
    var rating = 0;
    rows.forEach(element => {
        rating += element.point;
    });
    await driver.update({rating: rating/count});
    driver.setDataValue("rating", rating/count);
    return res.status(200).send(driver);
})
exports.updateDriver = catchAsync(async (req,res,next)=>{
    const driver = await Driver.findOne({where: {id: req.user.id}});
    if(!driver)
        return next(new AppError("Driver not found", 404));
    
    await driver.update(req.body);
    return res.status(200).send(driver);
});