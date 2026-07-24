import User from "../models/user.model.js";

export const findUserByEmail = async (email: string) => {
  return await User.findOne(
    {
      email: email.toLowerCase(),
    },
    {
      password: 0,
      __v: 0,
    },
  );
};
