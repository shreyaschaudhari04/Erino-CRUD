const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(express.json()); 
app.use(router);

require("./db/connection");
const users = require("./models/userSchema");

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})