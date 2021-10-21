import express from 'express';
require("dotenv").config();
const configure = require("./config/environment/index");
const cors = require("cors");
import routes from "./routes"
const mongoose = require("mongoose");

const app : express.Application = express();
app.use(cors());
app.use(express.json());
const config = configure.config
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});

//routes that will be used
routes(app)
mongoose.connect(config.dbConnectionString)
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
  console.error(err.message)
});

mongoose.connection.on("error", function (e) {
  console.error(e);
});


export default {app}