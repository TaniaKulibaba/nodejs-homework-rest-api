const passport = require('passport');
const { ExtractJwt, Strategy } = require('passport-jwt');
require('dotenv').config();
const { user: service } = require('../services/users');

const { SECRET_KEY } = process.env;

const settings = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY
};

const jwtStrategy = new Strategy(settings, async (payload, done) => {
  try {
    const user = await service.getById(payload.id);
    if (!user) {
      throw new Error("not found");
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use("jwt", jwtStrategy);
