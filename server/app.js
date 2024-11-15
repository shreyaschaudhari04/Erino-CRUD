const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const router = require('./routes/router');


const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://erino-crud-frontend.vercel.app/' 
    : 'http://localhost:5173', 
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  preflightContinue: false,  
};

app.use(cors(corsOptions)); 
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', corsOptions.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200); 
});

app.use(express.json());
app.use(router);  

require('./db/connection');  
const users = require('./models/userSchema');  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
