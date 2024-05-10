const express = require("express");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const userRouter = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

userRouter.get("/getuser/:id", auth, userController.getuser);

userRouter.get("/getallusers", auth, userController.getallusers);

userRouter.post("/login", userController.login);

// Apply the upload middleware to handle file fields. 'pic' is the name of the field that holds the file.
userRouter.post("/register", upload.single('pic'), userController.register);

userRouter.put("/updateprofile", auth, userController.updateprofile);

userRouter.delete("/deleteuser", auth, userController.deleteuser);

module.exports = userRouter;
