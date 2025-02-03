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
router.patch("/change-project-name", verifyToken, changeProjectName);
router.delete("/delete-project", verifyToken, deleteProject);
//router.post("/duplicate-project", verifyToken, projectDuplicate);
router.patch("/add-collaborators", verifyToken, addCollaborators);
router.post("/new-file", verifyToken, newFile);
router.delete("/delete-file", verifyToken, deleteFile);
router.get("/get-file", verifyToken, getFile);
router.get("/get-project", verifyToken, getProject);
router.get("/get-users-projects", verifyToken, getUsersProjects)

export default router;
