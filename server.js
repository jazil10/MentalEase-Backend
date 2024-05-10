const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./db/conn');
const userRouter = require('./routes/userRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const appointRouter = require('./routes/appointRoutes');
const path = require('path');
const notificationRouter = require('./routes/notificationRouter');
const chatbotRouter = require('./routes/chatbotRoutes');
const multer = require('multer');
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/appointment', appointRouter);
app.use('/api/notification', notificationRouter);
app.use('/api/chat', chatbotRouter);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(port, () => {
  console.log(
    `server running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
  );
});
