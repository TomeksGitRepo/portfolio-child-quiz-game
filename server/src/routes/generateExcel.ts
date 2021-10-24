import express from "express";
import passport from "passport";
import ExcelJS from 'exceljs';
import SchoolData from "../database/models/SchoolSchema";
import { checkIfUserLogedIn } from "./quizStatus"; //TODO use this to check if user is loged in

export var generatingExcelRouter = express.Router();

function getCorrectPreTestAnswers(data : any) {
  var preTestCorrectAnswers = 0;
  data['results'].map(function (item: any) {
    if (item.questionType === 0 && item.isAnswerCorrect === true) {
      preTestCorrectAnswers = preTestCorrectAnswers + 1;
    }
  });
  return preTestCorrectAnswers;
}

function getPreTestQuestionNumber(data: any) {
  var preTestQuestionNumber = 0;
  data["results"].map(function (item: any) {
    if (item.questionType === 0) {
      preTestQuestionNumber = preTestQuestionNumber + 1;
    }
  });
  return preTestQuestionNumber;
}

function getCorrectPostTestAnswers(data : any) {
  var postTestCorrectAnswers = 0;
 data["results"].map(function (item: any) {
   if (item.questionType === 1 && item.isAnswerCorrect === true) {
     postTestCorrectAnswers = postTestCorrectAnswers + 1;
   }
 });
  return postTestCorrectAnswers;
}
function getPostTestQuestionNumber(data : any) {
  var postTestQuestionNumber = 0;
  data["results"].map(function (item: any) {
    if (item.questionType === 1) {
      postTestQuestionNumber = postTestQuestionNumber + 1;
    }
  });
  return postTestQuestionNumber;
}
function getPercentageChange(preTestCorrect : number, postTestCorrect : number, questionNumber : number) {
  var percentageChange =
    ((postTestCorrect - preTestCorrect) / questionNumber) * 100;
  return percentageChange;
}
function getQuestionType(question : any) {
  if (question.questionType === 0) {
    return "PreTest";
  }
  if (question.questionType === 1) {
    return "PostTest";
  }
}
function isAnswerCorrect(question : any) {
  if (question.isAnswerCorrect) {
    return "Poprawna";
  } else {
    return "Błędna";
  }
}
function getQuizDifficultyLevel(data : any) {
  if (data.difficultyLevel === 0) {
    return "Wiek 3-4 lata";
  }
  if (data.difficultyLevel === 1) {
    return "Wiek 5-6 lat";
  }
  if (data.difficultyLevel === 2) {
    return "Dorośli";
  }
} 

async function createExcel(data: any) {
  const workbook = new ExcelJS.Workbook();
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 10000,
      height: 20000,
      firstSheet: 0,
      activeTab: 1,
      visibility: "visible",
    },
  ];

  const sheet = workbook.addWorksheet("Wyniki Quizów", {properties: {defaultColWidth: 12}});

  generateResult(sheet, data); //Dummy data
  // console.log(__dirname)
  var saveDir = __dirname.split('/routes')[0];

  await workbook.xlsx.writeFile(
    saveDir + "/resultExcels/generatedResults.xlsx"
  );

}

class ColumnPopulator {
  constructor(worksheet: ExcelJS.Worksheet) {
    this.currentWorksheet = worksheet;
  }
  currentWorksheet: ExcelJS.Worksheet;
  maxResultLenght: number  = 0;
  currentRowForColumns: { [n: number]: number } = { 1: 1 };
  currentColumn : number = 1;

  changeMaxResultValue(value: number) {
    if (this.maxResultLenght < value) {
      for (var i = this.maxResultLenght; i < value; i++) {
        this.generateResultHeaders(`Test nr ${i + 1}`);
      }
      this.maxResultLenght = value;
    }
  }

  generateResultHeader(data: any) {
        this.currentWorksheet.getColumn(1).width = 19;
        this.changeMaxResultValue(data["results"].length);
        this.currentColumn += 1;
        this.addValue(data["schoolName"], this.currentColumn);
        this.addValue("Wyniki", this.currentColumn);
        var dataLenght = data["results"].length;
        this.addValue(data["results"].length, this.currentColumn);

          this.generateOneSchoolResults(data["results"]);

  }

  generateOneSchoolResults(input: any) {
    var data = input;

    for (var key in data) {
      var item = data[key];
      this.addValue("", this.currentColumn);
      this.addValue((item as any)["created_at"], this.currentColumn);
      var difficultyLevel =
        getQuizDifficultyLevel(item) ??
        "Problem z generowaniem poziomu trudności";
        
      this.addValue(difficultyLevel, this.currentColumn);
      this.addValue("", this.currentColumn);
   
       const correctPreAnswers = getCorrectPreTestAnswers(item).toString();
       this.addValue(correctPreAnswers, this.currentColumn);
       const numberOfPreQuestions = getPreTestQuestionNumber(
         item
       ).toString();
       this.addValue(numberOfPreQuestions, this.currentColumn);
       this.addValue("", this.currentColumn);
       const correctPostAnswers = getCorrectPostTestAnswers(item).toString();
       this.addValue(correctPostAnswers, this.currentColumn);
       const numberOfPostQuestion = getPostTestQuestionNumber(
          item
       ).toString();
       this.addValue(numberOfPostQuestion, this.currentColumn);
       const percentageChange = getPercentageChange(
         parseInt(correctPreAnswers),
         parseInt(correctPostAnswers),
         parseInt(numberOfPreQuestions)
       );
       this.addValue(percentageChange.toString() + "%", this.currentColumn);
       this.addValue("", this.currentColumn);
       this.addValue("", this.currentColumn);
       //Qenerate preTest results
       var iterator = 0;
       for (
         var i = 0;
         i < data[key]["results"].length;
         i++
       ) {
         iterator++;
        if (
          data[key]["results"][i]["questionType"] === 0 &&
          data[key]["results"][i]["isAnswerCorrect"] == true
        ) {
          this.addValue("Dobra", this.currentColumn);
        }
        if (
          data[key]["results"][i]["questionType"] === 0 &&
          data[key]["results"][i]["isAnswerCorrect"] == false
        ) {
          this.addValue("Zła", this.currentColumn);
        }
        if (data[key]["results"][i]["questionType"] === 1) {
          break;
        } 
       }
       if (iterator < 10) {
        for (var j = 0; j < 10 - iterator + 1; j++) {
          this.addValue("X", this.currentColumn);
        }
       }
       this.addValue("", this.currentColumn);
       iterator = 0;
       var reversed = data[key]["results"].reverse();
       for (var i = 0; i < reversed.length; i++) {
         iterator++;
         if (
           data[key]["results"][i]["questionType"] === 1 &&
           data[key]["results"][i]["isAnswerCorrect"] == true
         ) {
           this.addValue("Dobra", this.currentColumn);
         }
         if (
           data[key]["results"][i]["questionType"] === 1 &&
           data[key]["results"][i]["isAnswerCorrect"] == false
         ) {
           this.addValue("Zła", this.currentColumn);
         }
         if (data[key]["results"][i]["questionType"] === 0) {
           break;
         }
       }
       if (iterator < 10) {
         for (var j = 0; j < 10 - iterator + 1; j++) {
           this.addValue("X", this.currentColumn);
         }
       }
    }
  }



  addValue(value: string, column: number) {
     if (this.currentRowForColumns[column] == undefined) {
       this.currentRowForColumns[column] = 1;
     }
    this.currentWorksheet.getCell(
      this.currentRowForColumns[column], column
    ).value = value;
    this.currentRowForColumns[column] = this.currentRowForColumns[column] + 1;
  }
  addHeaderValue(value: string) {
      this.currentWorksheet.getCell(this.currentRowForColumns[1], 1).value = value;
      this.currentRowForColumns[1] = this.currentRowForColumns[1] + 1;
  }
  generateHeaders() {
  this.addHeaderValue("Nazwa");
  this.addHeaderValue("Wyniki");
  this.addHeaderValue("Ilość testów");
}
generateResultHeaders( testName: string) {
  this.addHeaderValue(testName);
  this.addHeaderValue("Data testu");
  this.addHeaderValue("Poziom trudności");
  this.addHeaderValue("PreTest");
  this.addHeaderValue("Poprawne odpowiedzi");
  this.addHeaderValue("Ilość pytań");
  this.addHeaderValue("PostTest");
  this.addHeaderValue("Poprawne odpowiedzi");
  this.addHeaderValue("Ilość pytań");
  this.addHeaderValue("Procentowa zmiana");
  this.addHeaderValue("Odpowiedzi:");
  this.addHeaderValue("PreTest");
  this.addHeaderValue("Pytanie nr 1");
  this.addHeaderValue("Pytanie nr 2");
  this.addHeaderValue("Pytanie nr 3");
  this.addHeaderValue("Pytanie nr 4");
  this.addHeaderValue("Pytanie nr 5");
  this.addHeaderValue("Pytanie nr 6");
  this.addHeaderValue("Pytanie nr 7");
  this.addHeaderValue("Pytanie nr 8");
  this.addHeaderValue("Pytanie nr 9");
  this.addHeaderValue("Pytanie nr 10");
  this.addHeaderValue("PostTest");
  this.addHeaderValue("Pytanie nr 1");
  this.addHeaderValue("Pytanie nr 2");
  this.addHeaderValue("Pytanie nr 3");
  this.addHeaderValue("Pytanie nr 4");
  this.addHeaderValue("Pytanie nr 5");
  this.addHeaderValue("Pytanie nr 6");
  this.addHeaderValue("Pytanie nr 7");
  this.addHeaderValue("Pytanie nr 8");
  this.addHeaderValue("Pytanie nr 9");
  this.addHeaderValue("Pytanie nr 10");
}
}






function generateResult(worksheet: ExcelJS.Worksheet, data: any) {
  var columnPopulator = new ColumnPopulator(worksheet);
  columnPopulator.generateHeaders();
  for (var item in data) {
    columnPopulator.generateResultHeader(data[item]);
  }
  // console.log(`data in generateResult is ${data}`);
}

generatingExcelRouter.get("/ResultExcel", checkIfUserLogedIn, async function (req, res, next) {
  var quizResultData = await SchoolData.find({}).exec();
  //console.log(`quizResultData is: ${quizResultData}`);
  //console.log("in router.get(/generateResultExcel)");
  await createExcel(quizResultData);
  var filePath = __dirname.split('/routes')[0] + '/resultExcels/generatedResults.xlsx';
  // console.log(filePath)
  res.download(filePath, 'wyniki.xlsx');
});

