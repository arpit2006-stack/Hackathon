import mongoose from "mongoose";

const Nomination = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email:{
        type:String,
        require:true
    },
    contactNo: {
      type: String,
      require: true,
      unique: true,
    },
    post: {
      type: String,
      require: true,
    },
    agenda: {
      type: String,
      require: true,
    },
    status: { // Added status field for tracking
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
      },
      ssamt: {
        url: { type: String, required: true },
        publicId: { type: String, required: true }
      }
  },
  { timestamps: true }
);

const Apply = mongoose.model("candidate", Nomination);

export default Apply;
