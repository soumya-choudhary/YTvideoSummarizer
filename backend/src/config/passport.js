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
                    const email = profile.emails?.[0].value;
                    user = await User.findOne({ email });

                    if (user) {
                        user.googleId = profile.id;
                        if (!user.profilePic && profile.photos?.[0].value) {
                            user.profilePic = profile.photos[0].value;
                        }
                        if (!user.fullname && profile.displayName) {
                            user.fullname = profile.displayName;
                        }
                        await user.save();
                    } else {
                        user = await User.create({
                            fullname: profile.displayName,
                            email: email,
                            googleId: profile.id,
                            profilePic: profile.photos?.[0].value,
                        });
                    }
                }

                done(null, user);
            } catch (err) {
                done(err, undefined);
            }
        },
    ),
);

export default passport;
