const axios = require("axios");

exports.pathfinder = async(pointA, pointB) => {
    const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lng},${pointA.lat};${pointB.lng},${pointB.lat}?steps=true`;
    const res = await axios({
        method: "GET",
        url
    });
    return res.data;
    // return res;
}
exports.pointfinder = async(lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=tk`
    const res = await axios({
        method: "GET",
        url
    })
    return res.data;
}
