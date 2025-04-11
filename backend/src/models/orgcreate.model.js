import mongoose from "mongoose";

const OrgSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    committeeMembers: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const ORG = mongoose.model("organisations", OrgSchema);

export default ORG;