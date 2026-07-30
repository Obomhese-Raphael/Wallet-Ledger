import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { getUserByEmail } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";
import { uploadAvatar } from "../services/user.service.js";

const router = Router();

router.get("/find", protect, getUserByEmail);
router.patch("/avatar", protect, upload.single("avatar"), uploadAvatar);

export default router;
