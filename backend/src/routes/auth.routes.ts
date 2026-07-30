import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.js";
import { registerSchema } from "../validators/auth.validator.js";
import { register, sendVerificationOtp, verifyEmail } from "../controllers/auth.controller.js";
import { loginSchema } from "../validators/auth.validator.js";
import { login } from "../controllers/auth.controller.js";
import { getCurrentUser } from "../controllers/auth.controller.js";


const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/currentUser", protect, getCurrentUser);
router.post("/send-verification-otp", protect, sendVerificationOtp);
router.post("/verify-email", protect, verifyEmail);

export default router;
