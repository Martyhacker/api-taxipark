const catchAsync = require("../../utils/catchAsync");
const { pathfinder, pointfinder } = require("../../utils/osrm_util");
const crypto = require('crypto-js');
exports.findRoute = catchAsync(async (req, res, next) => {
    const { pointA, pointB } = req.body;
    const data = await pathfinder({ lng: pointA.lng, lat: pointA.lat }, { lng: pointB.lng, lat: pointB.lat });
    const dData = JSON.stringify(data);
    const result = crypto.AES.encrypt(dData, 'PeykamTaxi').toString();
    return res.status(200).send(result);
});

exports.findPointByCoordinate = catchAsync(async (req, res, next) => {
    const { lat, lng, keyword } = req.body;
    const data = await pointfinder(lat, lng, keyword);
    const dData = JSON.stringify(data);
    const result = crypto.AES.encrypt(dData, 'PeykamTaxi').toString();
    return res.status(200).send(result);
})
