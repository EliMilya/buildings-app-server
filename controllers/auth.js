const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email });

  if (candidate) {
    // If we create new users and encode their passwords these line must be uncomment
    // const passwordResult = bcrypt.compareSync(
    //   req.body.password,
    //   candidate.password
    // );
    // if (passwordResult)
    const token = jwt.sign(
      {
        email: candidate.email,
        userId: candidate._id,
      },
      keys.jwt,
      { expiresIn: 60 * 60 }
    );

    res.status(200).json({
      token: `Bearer ${token}`,
    });
  } else {
    res.status(401).json({
      message: "Password or mail doesn't match. Try again",
    });
  }
};
