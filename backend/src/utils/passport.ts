import userModel, { IUser } from "../models/user.model";
import passport from 'passport'
import * as passportLocal from 'passport-local'
import bcrypt from 'bcryptjs'

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser((user: any, done: any) => {
    done(null, user);
}); 

passport.deserializeUser(async (user: any, done: any) => {
    userModel.findById(user._id, (err: any, user: IUser) => {
        if(!user) return done(err, null)
        const userObj = {
            _id: user._id.toString(),
            pfp: user.pfp,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin,
        }
        done(err, userObj);
    });
});


passport.use(new LocalStrategy(
    (email, password, done) => {
        userModel.findOne({ email }, async (err: any, user: IUser) => {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) { return done(null, false); }
            return done(null, user);
        });
    }
))