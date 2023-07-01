module.exports = {
    apps: [
        {
            name: "api-taxipark",
            script: "./serverjs",
            exec_mode: "cluster"
        }
    ]
};