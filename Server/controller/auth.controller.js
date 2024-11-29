import User from "../models/userSchema.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signup = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt, null);
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: hash,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    } else {
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        success:true
        
      });
    }
  });
};

const signin = (req, res) => {
  console.log("req.body", req?.body)
  try {
    User.findOne({
      $or: [
        { username: req.body.username },
        { email: req.body.email }
      ]
    }).select('+password')
      .exec((err, user) => {
        console.log("adsd0",user,err)
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        console.log("TestUserrrr", user)
        var passwordIsValid = bcrypt.compare(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id },
          process.env.TOKEN_SECRET);


        req.session.token = token;
        res.cookie('access_token', token, {
          // httpOnly: true, // Prevents JavaScript access
          secure: process.env.NODE_ENV === 'production', // Ensures cookies are sent over HTTPS
          sameSite: 'none', // Allows cookies to be sent cross-origin
          maxAge: 60 * 60 * 1000 // 1 hour
        });

        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          success:true
        });
      });
  } catch (error) {
    this.next(err);
    console.log("error", error)
  }

};

const signout = async (req, res) => {
  try {
    req.session = null;
    res.clearCookie('access_token');
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};

export {
  signup,
  signin,
  signout
}