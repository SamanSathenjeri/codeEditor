import { User } from "../db/authModel.js";
import { File } from "../db/fileModel.js";
import { Project } from "../db/projectModel.js";

export const createProject = async (req, res) => {
  let { name, filepaths } = req.body;
  try {
    if (!name) throw new Error("Name is required");
    filepaths = filepaths || [];

    const user = await User.findById(req.userId);
    if (!user) return res.status(400).json({ success: false, message: "User Not Found" });

    const project = new Project({
      name,
      owner: req.userId,
      filepaths,
    });

    await project.save();
    res.status(201).json({ success: true, message: "Project created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changeProjectName = async (req, res) => {
  const { projectName } = req.body;
  const { projectId } = req.params;
  try {
    if (!projectName) throw new Error("Name is required");

    const project = await Project.findById(projectId);
    if (!project) return res.status(400).json({ success: false, message: "Project Not Found" });

    project.name = projectName;
    await project.save();

    res.status(200).json({ success: true, message: "Project name changed successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(400).json({ success: false, message: "Project Not Found" });
    }
    res.status(200).json({ success: true, message: "Project deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const addCollaborators = async (req, res) => {
  try {
    const { userId } = req.body;
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(400).json({ success: false, message: "Project Not Found" });

    await Project.updateOne(
      { _id: project._id },
      { $push: { collaborators: userId } }
    );

    res.status(200).json({ success: true, message: "Added Collaborator" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);
    if (!project) return res.status(400).json({ success: false, message: "Project Not Found" });

    res.status(200).json({ success: true, project });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const newFile = async (req, res) => {
  try {
    const { name, path, s3_key, size, type } = req.body;
    if (!(name && path && s3_key && size && type)) {
      throw new Error("All fields are required");
    }

    const fileAlreadyExists = await File.findOne({ path, s3_key });
    if (fileAlreadyExists) {
      return res.status(400).json({ success: false, message: "File already exists" });
    }

    const file = new File({ name, path, s3_key, size, type });
    await file.save();
    
    res.status(200).json({ success: true, message: "File successfully created" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const deletedFile = await File.findByIdAndDelete(fileId);
    if (!deletedFile) {
      return res.status(400).json({ success: false, message: "File Not Found" });
    }
    res.status(200).json({ success: true, message: "File deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUsersProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [{ owner: req.userId }, { users: req.userId }],
    }).populate("owner users");

    res.status(200).json({ success: true, projects });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
