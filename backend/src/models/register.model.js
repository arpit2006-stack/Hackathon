import mongoose from "mongoose";

const NomSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    age: {
      type: String,
      require: true,
    },
    post: {
      type: String,
      require: true,
    },
    status: { 
      type: String, 
      enum: ['pending-verification', 'verified', 'rejected'],
      default: 'pending-verification'
    }
  },
  { timestamps: true }
);

const Nominee = mongoose.model("Nominees", NomSchema);

export default Nominee;
