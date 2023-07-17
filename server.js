const app = require("./app");
const {Constants} = require("./models");
// const sequelize = require("./models");
require("dotenv").config();
const PORT = parseInt(process.env.PORT) || 1600;
const server = app.listen(PORT, async () => {
    console.log(`Connected to DB and listening on port ${PORT}...`);
  });
  process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  