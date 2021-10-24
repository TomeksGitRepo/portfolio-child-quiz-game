import express from "express";
import passport from "passport";
import SchoolData from "../database/models/SchoolSchema";
import moment from "moment";

moment.locale("pl");

export var quizStatusRouter = express.Router();

export function checkIfUserLogedIn(
  request: express.Request,
  response: express.Response,
  next: Function
) {
  var user = request.user;
  if (!user) {
    response
      .status(400)
      .send(
        "Użytkownik niezalogowany. Dostęp zablokowany. Zaloguj się i spróbuj jeszcze raz."
      );
    return;
  }
  next();
}

quizStatusRouter.get(
  "/quizresults/status",
  checkIfUserLogedIn,
  async function (req, res, next) {
    var quizResultData = await SchoolData.find({}).exec();
    var parsedData = JSON.stringify(quizResultData);
    console.log("in router.get(/quizresults/status)");
    res.render("ResultsStatus", { parsedData, quizResultData, moment });
  }
);
