const axios = require("axios");

module.exports = async(pointA, pointB) => {
    const url = `http://router.project-osrm.org/route/v1/driving/${pointA.lng},${pointA.lat};${pointB.lng},${pointB.lat}?steps=true`;
    const res = await axios({
        method: "GET",
        url
    });
    return res.data;
    // return res;
}
