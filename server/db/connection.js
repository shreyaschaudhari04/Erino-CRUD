const mongoose = require("mongoose");

const DB = "mongodb+srv://shreyasrchaudhari:mBqyG0sJwyt2Q2n1@cluster0.uxajh.mongodb.net/Erino?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log("Connection Established")).catch((err) => {
    console.log(err.message);
})