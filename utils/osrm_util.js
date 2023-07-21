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
exports.pointfinder = async(lat, lng, keyword) => {
    const search_url = `https://nominatim.openstreetmap.org/search?q=${keyword}&format=jsonv2&addressdetails=1&countrycodes=tm`;
    const point_url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=jsonv2&accept-language=ru`
    const url = keyword ? search_url : point_url;
    const res = await axios({
        method: "GET",
        url
    })
    return res.data;
}
