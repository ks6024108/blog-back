import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const isAuth = async (req, res, next) => {
  try {
    // console.log("auth9", req.headers.authorization);
    // const authorization = req.headers.authorization
    // ? req.headers.authorization.split("")
    //   : [];
    // console.log("aaa", authorization);
    // const token = authorization.length > 1 ? authorization[1] : null;
    const authorization = req.header("Authorization");
    // console.log(authorization);
    if (!authorization) {
      res.code = 404;
      throw new Error("No Token Provided");
      //  return res.status(404).send({ message: "No token provided" });
    }

    const token = authorization.split(" ")[1];
    // console.log("token", token);
    if (token) {
      const payload = jwt.verify(token, config.jwt_secret);
      // console.log("payload:", payload);
      if (payload) {
        req.user = {
          _id: payload._id,
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };
        next();
      } else {
        res.code = 401;
        throw new Error("Unauthorized");
      }
    } else {
      res.code = 400;
      throw new Error("token is required");
    }
  } catch (error) {
    next(error);
  }
};

export default isAuth;
