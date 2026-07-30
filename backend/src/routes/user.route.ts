import { Router } from "express";

import { protect } from "../middleware/auth.middleware.js";
import { getUserByEmail, updateAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/find", protect, getUserByEmail);
router.patch("/avatar", protect, upload.single("avatar"), updateAvatar);

export default router;
