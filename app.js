const express = require("express");
const app = express();
const mongoose = require("mongoose");
const keys = require("./config/keys");
const passport = require("passport");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const buildingsRoutes = require("./routes/buildings");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

mongoose
  .connect(keys.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Mongo connected !!! (-_-) !!!"))
  .catch((error) => console.log(error));

mongoose.set("useCreateIndex", true);

// Use helmet with 11 included middlewares for protection
app.use(helmet());
// Use passport js to protect routes
app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use(morgan("dev"));
// Use body parser for json parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingsRoutes);


module.exports = app;

//  Use this command to test your application for vulnerabilities:
//                      $ snyk test
