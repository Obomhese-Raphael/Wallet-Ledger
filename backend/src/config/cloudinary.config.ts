import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

// in cloudinary.config.ts, after cloudinary.config(...)
console.log("Cloudinary config check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "❌ MISSING",
  api_key: process.env.CLOUDINARY_API_KEY ? "✅ present" : "❌ MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "✅ present" : "❌ MISSING",
});

export default cloudinary;
