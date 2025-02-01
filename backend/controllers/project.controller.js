import { User } from "../db/authModel.js";
import { File } from "../db/fileModel.js"
import { Project } from "../db/projectModel.js"

export const createProject = async (req, res) => {
  const { name, filepaths } = req.body;
  try {
    if (!name) {throw new Error("Name is required")}
    if(!filepaths) {filepaths = []}

    const user = await User.findById(req.userId);
    if (!user) { return res.status(400).json({ success: false, message: "User Not Found" }); }

    const project = new Project({
      name,
      owner: req.userId,
      filepaths: filepaths
    })

    await project.save()
    res.status(201).json({success: true, message: "Project created succesfully"});
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changeProjectName = async (req, res) => {
  const { projectName } =  req.body
  try {
    if (!projectName) {throw new Error("Name is required")}

    const project = await Project.findById(req.projectId);
    if (!project) {return res.status(400).json({ success: false, message: "Project Not Found" });}
    project.name = projectName

    await project.save()
    
    res
      .status(200)
      .json({ success: true, message: "Project name changed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.userId);
    if (!deletedProject) {
      return res
        .status(400)
        .json({ success: false, message: "Project Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// export const projectDuplicate = async (req, res) => {
//   try {
//     const project = await Project.findById(req.projectId);
//     if (!project) {return res.status(400).json({ success: false, message: "Project Not Found" });}

//     const newName = project.name + "copy"

//     const newProject = new Project({
//       name: newName,
//       owner: project.owner,
//       collaborators: project.collaborators,
//       filepaths: project.filepaths
//     })

//     await newProject.save()
//     res.status(201).json({success: true, message: "Project duplicated succesfully"});

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// export const downloadProject = async (req, res) => {
//   try {
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

export const addCollaborators = async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const newFolder = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const newFile = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFolder = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFile = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getFile = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getFolder = async (req, res) => {
  try {
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProject = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
