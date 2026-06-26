import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import config from "../config/config.js";
import { AppError } from "../utils/AppError.util.js";

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError("Unauthorized - No Token Provided", 401);
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, config.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        req.user = user;
        next();
    } catch (error) {
        if (error instanceof Error) {
            next(error);
        } else {
            next(new AppError("Unauthorized", 401));
        }
    }
};

export default protectRoute;
