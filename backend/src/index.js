import config from "./config/config.js";
import express from "express";
import cors from "cors";
import connectDb from "./db/db_connect.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.route.js";
import videoRoutes from "./routes/video.route.js";

const app = express();
const PORT = config.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Welcome to Express server....");
});

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
