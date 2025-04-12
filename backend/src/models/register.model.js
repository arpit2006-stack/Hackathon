import mongoose from "mongoose";

// register.model.js
const NomSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    // post: { type: String, required: true },
    registrationId: { type: String, unique: true , sparse: true , default:undefined },
    idProof: {
      url: String,
      publicId: String,
    },
    tempIdProof: {
      // Temporary storage during OTP process
      url: String,
      publicId: String,
    },
  },
  { timestamps: true }
);

const Nominee = mongoose.model("Nominees", NomSchema);

export default Nominee;
