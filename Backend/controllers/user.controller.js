import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(404).json({
        message: "Missing require fields",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "User email already exists",
        success: false,
      });
    }

    //Coverting password to Hash of length 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    return res.status(201).json({
      message: `Account created successfully for ${newUser.fullname}`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration went wrong.Try again",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        success: false,
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: "You don't have the necessary role to access this resource",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const sanitizedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
      })
      .json({
        message: `Welcome Back ${user.fullname}`,
        user: sanitizedUser,
        success: true,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Login Failed, Try again",
      success: false,
    });
  }
};

export const updateprofile = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    // cloudinary upload

    // const skillsArray = skills.split(",");
    const userId = req.id; // middleware authentication

    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skills.split(",");
    // resume to be added on later

    await user.save();

    let sanitizedUser = {
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: `${sanitizedUser.fullname}, your profile updated successfully`,
      success: true,
      user: sanitizedUser,
    });
  } catch (error) {
    console.error("Error in updateprofile route:", error); 
    return res.status(500).json({
      message: "Server Error in updating profile",
      success: false,
      error: error.message,
    });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "LoggedOut Successfully !",
      success: true,
    });
  } catch (error) {
    return res.send(500).json({
      message: "Loggout Failed, Try Again",
      success: false,
    });
  }
};
