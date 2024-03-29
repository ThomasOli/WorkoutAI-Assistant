const router = require("express").Router();
const passport = require('passport');

router.get("/google",passport.authenticate("google",))