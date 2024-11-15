const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const router = require("./routes/router");

// CORS configuration for allowing specific origins
const corsOptions = {
  origin: "*",  // You can replace '*' with 'http://localhost:5173' if needed for local development
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,  // Ensures that OPTIONS requests are handled properly
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200); 
});

app.use(express.json());
app.use(router); 


require("./db/connection");
const users = require("./models/userSchema");

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
