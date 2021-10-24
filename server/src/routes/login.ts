import express from "express";
import passport from "passport";

export var loginRouter = express.Router();

loginRouter.get("/login", function (req, res, next) {
  console.log("in router.get(/login)");
  res.render("LoginForm");
});

loginRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/quizresults/status",
    failureRedirect: "/login",
  })
);
