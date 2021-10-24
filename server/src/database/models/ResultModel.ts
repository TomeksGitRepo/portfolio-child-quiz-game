import mongoose, { now, model } from "mongoose";

interface resultInfo {
  questionType: number;
  questionNumber: number;
  isAnswerCorrect: boolean;
}

const ResultInfoSchema = new mongoose.Schema({
  questionType: Number,
  questionNumber: Number,
  isAnswerCorrect: Boolean,
});

const ResultInfoModel = model<resultInfo>("result_info", ResultInfoSchema);

export interface ResultsDataDoc extends mongoose.Document {
  results: Array<resultInfo>;
  created_at: Date;
  difficultyLevel: Number;
}

export interface ResultsDataModel extends mongoose.Model<ResultsDataDoc> {
  build(resultData: Array<resultInfo>, difficultyLevel: Number): ResultsDataDoc;
}
export const ResultsDataSchema = new mongoose.Schema<
  ResultsDataDoc,
  ResultsDataModel
>({
  created_at: { type: Date, default: Date.now, required: true },
  results: { type: [ResultInfoSchema] },
  difficultyLevel: Number,
});

ResultsDataSchema.statics.build = (
  resultData: Array<resultInfo>,
  difficultyLevel: number
) => {
  if (resultData.length === 0) {
    return;
  }
  var castedData: Array<resultInfo> = [];
  for (let iter of resultData) {
    var castedValue = new ResultInfoModel({ ...iter });
    castedData.push(castedValue);
  }
  return new ResultsData({ results: castedData, difficultyLevel });
};

var ResultsData =
  mongoose.models.ResultsData ||
  mongoose.model<ResultsDataDoc, ResultsDataModel>(
    "ResultsData",
    ResultsDataSchema
  );

export default ResultsData;
