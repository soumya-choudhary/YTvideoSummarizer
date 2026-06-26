import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.util.js";
import { AppError } from "../utils/AppError.util.js";

const signup = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new AppError("Username and password are required", 400);
        }

        const user = await User.findOne({ username });

        if (user) {
            throw new AppError("Username already exists", 400);
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashPassword,
        });

        if (!newUser._id) {
            throw new AppError("User does not have a _id", 500);
        }

        const token = generateToken(newUser._id.toString());

        if (!token) {
            throw new AppError("Token generation failed", 500);
        }

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            token,
        });
    } catch (error) {
        console.log("Error in signup controller");
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new AppError("Username and password are required", 400);
        }

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password || "",
        );

        if (!user || !isPasswordCorrect) {
            throw new AppError("Invalid username or password", 400);
        }

        if (!user._id) {
            throw new AppError("User does not have a _id", 500);
        }

        const token = generateToken(user._id.toString());

        if (!token) {
            throw new AppError("Token generation failed", 500);
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            token,
        });
    } catch (error) {
        console.log("Error in login controller");
        next(error);
    }
};

const loginGoogle = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            throw new AppError("Unauthorized", 401);
        }

        const token = generateToken(user._id.toString());

        res.send(`
  <script>
    window.opener.postMessage(${JSON.stringify({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
            token,
        })}, '*');
    window.close();
  </script>
`);
    } catch (error) {
        console.log("Error in loginGoogle controller");
        next(error);
    }
};

export { signup, login, loginGoogle };
