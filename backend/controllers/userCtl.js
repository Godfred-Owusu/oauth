import User from "../models/user.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res
      .status(200)
      .json({ success: true, message: "Users retrieved successfully", users });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve users",
      error: err.message,
    });
  }
};

// Sign In User
export const signUpUser = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword, // Store hashed password

      createdAt: new Date(),
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.statuts(400).json({
        success: false,
        message: "User doesn't exit",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.status(200).json({
      success: true,
      message: "User logged In",
      data: { email, password },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error",
      error: error.message,
    });
  }
};

// edit user
export const editUser = async (req, res) => {
  try {
    const { id } = req.params; // Get user ID from request params
    const updateUser = req.body; // Get the update data from request body

    // Update user directly
    const updatedUser = await User.findByIdAndUpdate(id, updateUser, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is applied to the updated data
    });

    // If the user is not found
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // If the update is successful
    res.status(200).json({
      success: true,
      message: "Edited successfully",
      data: updatedUser, // Include the updated user data in the response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
