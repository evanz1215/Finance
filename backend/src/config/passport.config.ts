import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import { Env } from "../config/env.config";
import { findByIdUserService } from "../services/user.service";

interface JwtPayload {
  userId: string;
}

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: Env.JWT_SECRET,
  audience: ["user"],
  algorithms: ["HS256"],
};

passport.use(
  new JwtStrategy(options, async (payload: JwtPayload, done: Function) => {
    try {
      if (!payload.userId) {
        return done(null, false, {
          message: "Invalid token payload",
        });
      }

      const user = await findByIdUserService(payload.userId);

      if (!user) {
        return done(null, false, {
          message: "User not found",
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false, {
        message: "Error occurred while authenticating",
      });
    }
  })
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export const passportAuthenticateJwt = passport.authenticate("jwt", {
  session: false,
});
