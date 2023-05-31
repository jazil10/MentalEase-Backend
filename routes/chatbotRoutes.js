const express = require("express");
const { ChatbotWork } = require("../controllers/chatbotController");
const chatbotRouter = express.Router();

chatbotRouter.post("/chatbot", ChatbotWork);

module.exports = chatbotRouter;
