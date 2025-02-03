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

export const addCollaborators = async (req, res) => {
  try {
    const { userId } = req.body;
    const addedUser = await User.findById(userId);

    const project = await Project.findById(req.projectId);
    if (!project) {return res.status(400).json({ success: false, message: "Project Not Found" });}

    const updateCollab = await Project.updateOne(
      { _id: project },
      { $push: { collaborators: addedUser } }
    );

    res.status(200).json({success: true, message: "Added Collaborator"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.projectId);
    if (!project) {return res.status(400).json({ success: false, message: "Project Not Found" });}
    res.status(200).json({success: true, message: "Project Found"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.fileId)
    if (!file) {return res.status(400).json({ success: false, message: "File Not Found" });}
    res.status(200).json({success: true, message: "File Found"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const newFile = async (req, res) => {
  try {
    const { name, path, s3_key, size, type } = req.body

    if (!(name && path && s3_key && size && type)) {
      throw new Error("All fields are required");
    }

    const fileAlreadyExists = await File.findOne({ path, s3_key });
    if (fileAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "File already exists" });
    }

    const file = new File({name, path, s3_key, size, type});
    res.status(200).json({success: true, message: "File successfully created"})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const deletedFile = await File.findByIdAndDelete(req.fileId);
    if (!deleteFile) {
      return res
        .status(400)
        .json({ success: false, message: "File Not Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getUsersProjects = async (req, res) => {
  try {
    const project = await Project.find({
      $or: [{ owner: req.userId }, { users: req.userId }]
    }).populate("owner users");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

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
//     }) ******************************************** have to find a way to duplicate files too!!! ************************************

//     await newProject.save()
//     res.status(201).json({success: true, message: "Project duplicated succesfully"});

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };