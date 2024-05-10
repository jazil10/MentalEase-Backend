const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const { BlobServiceClient } = require('@azure/storage-blob');
const multer = require('multer');
const upload = multer(); // Configure multer as needed for your setup

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function uploadImageToBlobStorage(buffer, blobName) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = 'images'; // Ensure this container exists in your Azure Blob Storage
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.upload(buffer, buffer.length);
    return blockBlobClient.url;
}

const getuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    return res.send(user);
  } catch (error) {
    res.status(500).send("Unable to get user");
  }
};

const getallusers = async (req, res) => {
  try {
    const users = await User.find().find({ _id: { $ne: req.locals } }).select("-password");
    return res.send(users);
  } catch (error) {
    res.status(500).send("Unable to get all users");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Incorrect credentials");
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Incorrect credentials");
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2 days" }
    );
    res.status(201).send({ msg: "User logged in successfully", token });
  } catch (error) {
    res.status(500).send("Unable to login user");
  }
};

const register = async (req, res) => {
  try {
    if (await User.findOne({ email: req.body.email })) {
      return res.status(400).send("Email already exists");
    }
    console.log(req.body.password);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.file);
    let imageUrl = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
    if (req.file) {
      imageUrl = await uploadImageToBlobStorage(req.file.buffer, `${Date.now()}-profile-pic`);
    }
    const newUser = new User({ ...req.body, password: hashedPassword, pic: imageUrl });
    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to register user");
  }
};

const updateprofile = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const update = { ...req.body, password: hashedPassword };
    if (req.file) {
      update.pic = await uploadImageToBlobStorage(req.file.buffer, `${req.params.id}-profile-pic`);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, update, { new: true });
    res.status(201).send("User updated successfully");
  } catch (error) {
    res.status(500).send("Unable to update user");
  }
};

const deleteuser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Doctor.findOneAndDelete({ userId: req.params.id });
    await Appointment.findOneAndDelete({ userId: req.params.id });
    res.send("User deleted successfully");
  } catch (error) {
    res.status(500).send("Unable to delete user");
  }
};

module.exports = {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
};
