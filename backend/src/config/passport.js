import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "./config.js";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.create({
                        fullname: profile.displayName,
                        email: profile.emails?.[0].value,
                        googleId: profile.id,
                        profilePic: profile.photos?.[0].value,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, undefined);
            }
        },
    ),
);

export default passport;
