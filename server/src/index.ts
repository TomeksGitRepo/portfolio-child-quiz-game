import express from "express";
import dbConnect from "./database/connections";
import SchoolObject from "./database/models/SchoolSchema";
import ResultsData, { ResultsDataModel } from "./database/models/ResultModel";
import serveStatic from "serve-static";
import path from "path";

import AdminObject from "./database/models/AdminModel";
import passport from "passport";
import AdminModel from "./database/models/AdminModel";
import { Strategy } from "passport-local";
import session from "express-session";

import { loginRouter } from "./routes/login";
import { quizStatusRouter } from "./routes/quizStatus";
import {generatingExcelRouter} from './routes/generateExcel';

var pathToServe = path.join(__dirname, "..", "..", "client", "build");
console.log(`pathToServe is ${pathToServe}`);

var serve = serveStatic(pathToServe, { maxAge: 31536000 });

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const port = 3006;

passport.use(
  new Strategy(function (username, password, done) {
    console.log("in finding user in db");
    AdminModel.findOne({ username }, function (err: any, result: any) {
      if (err) {
        return done(err);
      }
      if (!result) {
        return done(null, false);
      }
      if (result.password != password) {
        return done(null, false);
      }
      return done(null, result);
    });
  })
);
passport.serializeUser(function (user: any, done) {
  console.log("In serialize");
  var username = user._doc.username;
  done(null, username);
});

passport.deserializeUser(function (username, done) {
  console.log("in desirilize");
  AdminModel.findOne({ username }, function (err: any, user: any) {
    done(err, user);
  });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: "superHardPassChildrenGame" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

app.use("/", loginRouter);
app.use("/", quizStatusRouter);
app.use("/generate", generatingExcelRouter);
app.use(serve);


app.post("/results", (req, res) => {
  var { data } = req.body;
  var resultData = JSON.parse(data);
  const { result, schoolName, difficulty_level } = resultData;
  var results = (ResultsData as ResultsDataModel).build(
    result,
    difficulty_level
  );
  SchoolObject.findOneAndUpdate(
    { schoolName },
    { $push: { results } },
    { upsert: true },
    function (error, success) {
      if (error) {
        // console.log("Error saving data");
        // console.log(error);
        res.status(403).send({ error: JSON.stringify(error) });
      } else {
        // console.log("Success saving data");
        // console.log(success);
        res.status(201).send({});
      }
    }
  );

  // console.log(`result is: ${JSON.stringify(result)}`);
  // console.log(`created_at is: ${created_at}`);
  // console.log(`schoolName is: ${schoolName}`);
});

// app.use("*", function (req, res) {
//   res.sendFile(pathToServe + "/index.html");
// });

app.listen(port, () => {
  dbConnect();

  console.log(`Example app listening at http://localhost:${port}`);
});
