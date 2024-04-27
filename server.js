const express = require('express')
const cors = require('cors')
const path = require("path");
const dotenv = require('dotenv')
const router = require('./routes/route')
const mongoose = require('mongoose');
const app = express() // Creating the instance of express HTTP server with name : "app"

// USE MIDDLEWARE
app.use(cors()) // avoiding cors
app.use(express.json()) // using json data when needed


// mongodb connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://admin123:admin123@cluster0.2ahliul.mongodb.net/expense_tracker', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// LISTEN TO THE ROUTES
app.use('/api', router)

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
  

// LISTEN THE APP
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
