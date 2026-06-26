import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15d" });
};

export default generateToken;
