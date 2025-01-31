import express from "express";
import {createProject, changeProjectName, deleteProject, /*projectDuplicate,*/ downloadProject, addCollaborators} from "../controllers/project.controller.js";

const router = express.Router();

// router.get("/check-auth", verifyToken, checkAuth)
router.post("/create-project", createProject);
router.post("/change-project-name", changeProjectName);
router.post("/delete-project", deleteProject);
// router.post("/duplicate-project", projectDuplicate);
router.post("/download-project", downloadProject);
router.post("/add-collaborators", addCollaborators);

export default router;
