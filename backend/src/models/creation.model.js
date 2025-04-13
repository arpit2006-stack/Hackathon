import mongoose, { mongo } from "mongoose";

const exe = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    startDate: {
      type: String,
      require: true,
    },
    endDate: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


const Finale = mongoose.model("voting",exe);

export default Finale;