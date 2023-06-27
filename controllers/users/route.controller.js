const catchAsync = require("../../utils/catchAsync");
const {pathfinder, pointfinder} = require("../../utils/osrm_util");
exports.findRoute = catchAsync(async (req,res,next)=>{
    const {pointA, pointB} = req.body;
    const data = await pathfinder({lng: pointA.lng, lat: pointA.lat},{lng: pointB.lng, lat: pointB.lat});
    return res.status(200).send(data);
});

exports.findPointByCoordinate = catchAsync(async(req,res,next)=>{
    const {lat, lng} = req.body;
    const data = await pointfinder(lat, lng);
    return res.status(200).send(data);
})