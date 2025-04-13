import mongoose from "mongoose";

const fill = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  orgName: {
    type: String,
    require: true,
  },
  orgType: {
    type: String,
    require: true,
  },
  orgAddress: {
    type: String,
    require: true,
  },
  orgPincode: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
});

const Letter = mongoose.model("request", fill);

export default Letter;
