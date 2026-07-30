import cloudinary from "../config/cloudinary.config.js";
import User from "../models/user.model.js";
import appError from "../utils/appError.js";

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

export const uploadAvatar = async (userId: string, fileBuffer: Buffer) => {
  const user = await User.findById(userId);
  if (!user) throw new appError("User not found", 404);

  // Upload to Cloudinary
  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "wallet-ledger/avatars",
          transformation: [
            { width: 400, height: 400, crop: "fill", gravity: "face" },
          ],
        },
        (error, result) => {
          if (error || !result) reject(error || new Error("Upload failed"));
          else resolve(result as any);
        },
      )
      .end(fileBuffer);
  });
  
  user.avatar = result.secure_url;
  await user.save();

  const { password: _, otp: __, otpExpires: ___, ...safeUser } = user.toObject();
  return safeUser;
};