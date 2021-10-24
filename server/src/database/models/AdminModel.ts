import mongoose, { now, model } from "mongoose";

interface adminCredentials {
  username: string;
  password: string;
}

const AdminSchema = new mongoose.Schema({
  user: String,
  password: String,
});

const AdminModel = model<adminCredentials>("Admin", AdminSchema);

var AdminObject = mongoose.models.Admin || AdminModel;

export default AdminObject;
