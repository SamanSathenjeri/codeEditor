import express from "express";
import { verifyToken } from "../controllers/verifyToken.js"
import {changeName, changePassword, changeEmail, changeProfilePicture, deleteAccount} from "../controllers/account.controller.js";

const router = express.Router();

router.patch("/change-name", verifyToken, changeName);
router.patch("/change-password", verifyToken, changePassword);
router.patch("/change-email", verifyToken, changeEmail);
router.patch("/change-profile-picture", verifyToken, changeProfilePicture);
router.delete("/delete-account", verifyToken, deleteAccount);

export default router;
