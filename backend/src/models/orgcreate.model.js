import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ORG = mongoose.model("Organisation", OrgSchema);

export default ORG;
