import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const verifyToken = (req, res, next) => {
  // let token = req.session.token;
  const token = req.cookies.access_token ||req.session.token ;
  console.log(req.cookies.access_token)
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
    process.env.TOKEN_SECRET,
            (err, decoded) => {
              if (err) {
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded.id;
              req.user = {_id:decoded.id};
              next();
            });
};

export {verifyToken};
