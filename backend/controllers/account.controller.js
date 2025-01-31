import { User } from "../db/authModel.js";
import bcryptjs from "bcryptjs";

export const changeName = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    user.name = name;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Name updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPass, newPass, confirmedNewPass } = req.body;
    if (!(currentPass && newPass && confirmedNewPass)) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const isPasswordValid = await bcryptjs.compare(currentPass, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    if (newPass !== confirmedNewPass) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    user.password = await bcryptjs.hash(newPass, 10);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changeEmail = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    user.email = email;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Email updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const changeProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const { profilePicture } = req.body;
    if (!profilePicture) {
      return res
        .status(400)
        .json({ success: false, message: "Profile picture URL is required" });
    }

    user.profilePicture = profilePicture;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Profile picture updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.userId);
    if (!deletedUser) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
