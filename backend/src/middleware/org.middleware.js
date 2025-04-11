import jwt from "jsonwebtoken";
import ORG from "../models/orgcreate.model.js";

export const TokenGuard = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      const error = new Error("Access Denied");
      error.statusCode = 401;
      next(error);
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      const error = new Error("Access Denied");
      error.statusCode = 401;
      next(error);
    }

    const user = await ORG.findById(decode.userID).select("-password");
    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 400;

      next(error);
    }

    req.user = user;
    console.log("middleware", user);
    next();
  } catch (error) {
    next(error);
  }
};
