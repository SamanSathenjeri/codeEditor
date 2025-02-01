import express from "express";
import { verifyToken } from "../controllers/verifyToken.js";
import {
  createProject,
  changeProjectName,
  deleteProject,
  //projectDuplicate,
  //downloadProject,
  addCollaborators,
  newFile,
  newFolder,
  deleteFile,
  deleteFolder,
  getFile,
  getFolder,
  getProject,
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create-project", verifyToken, createProject);
router.patch("/change-project-name", verifyToken, changeProjectName);
router.delete("/delete-project", verifyToken, deleteProject);
//router.post("/duplicate-project", verifyToken, projectDuplicate);
//router.post("/download-project", verifyToken, downloadProject);
router.patch("/add-collaborators", verifyToken, addCollaborators);
router.post("/new-folder", verifyToken, newFolder);
router.delete("/delete-folder", verifyToken, deleteFolder);
router.post("/new-file", verifyToken, newFile);
router.delete("/delete-file", verifyToken, deleteFile);
router.get("/get-file", verifyToken, getFile);
router.get("/get-folder", verifyToken, getFolder);
router.get("/get-project", verifyToken, getProject);

export default router;
