import ORG from "../models/orgcreate.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { email, name, password } = req.body;
  console.log({ email, name, password });
  try {
    if (!email && !name && !password) {
      const error = new Error("All Details are required ");
      error.statuscode = 400;
      next(error);
      return;
    }

    const hashedpass = await bcrypt.hash(password, 5);

    const organization = await ORG.create({
      email,
      name,
      password: hashedpass,
    });

    console.log(organization._id);
    res
      .status(201)
      .json({
        message: `The Institution have been successfully registered ${organization.name}`,
      });
  } catch (error) {
    next(error);
  }
};
