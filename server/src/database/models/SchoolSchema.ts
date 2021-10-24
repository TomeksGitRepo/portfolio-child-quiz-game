import mongoose from "mongoose";
import ResultsData, { ResultsDataSchema } from "./ResultModel";

export const SchoolSchema = new mongoose.Schema({
  schoolName: { type: String, required: true, index: true },
  results: [ResultsDataSchema],
});

export default mongoose.models.SchoolSchema ||
  mongoose.model("school", SchoolSchema);
