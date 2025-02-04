import express from "express";
import { verifyToken } from "../controllers/verifyToken.js";
import {
  createProject,
  changeProjectName,
  deleteProject,
  //projectDuplicate,
  addCollaborators,
  newFile,
  deleteFile,
  getFile,
  getProject,
  getUsersProjects
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project", verifyToken, createProject);
router.patch("/change-project-name/:projectId", verifyToken, changeProjectName);
router.delete("/delete-project/:projectId", verifyToken, deleteProject);
router.patch("/add-collaborators/:projectId", verifyToken, addCollaborators);
router.post("/new-file", verifyToken, newFile);
router.delete("/delete-file/:fileId", verifyToken, deleteFile);
router.get("/get-file/:fileId", verifyToken, getFile);
router.get("/get-project/:projectId", verifyToken, getProject);
router.get("/get-users-projects", verifyToken, getUsersProjects);

export default router;
