const catchAsync = require("../../utils/catchAsync");
const osrm_util = require("../../utils/osrm_util");
exports.findRoute = catchAsync(async (req,res,next)=>{
    const {pointA, pointB} = req.body;
    const data = await osrm_util({lng: pointA.lng, lat: pointA.lat},{lng: pointB.lng, lat: pointB.lat});
    return res.status(200).send(data);
})