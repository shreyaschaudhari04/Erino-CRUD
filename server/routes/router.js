const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

router.get("/", (req, res) => {
    console.log("Connect");
    res.send("API is working"); 
});


//REGISTER NEW USER
router.post("/contacts", async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, email, mobileNumber, company, jobTitle } = req.body;

    if (!firstName || !lastName || !email || !mobileNumber || !company || !jobTitle) {
        return res.status(400).json("Please fill in all the required data");
    }

    try {
        const preUser = await users.findOne({ email: email });
        if (preUser) {
            return res.status(400).json("User already exists");
        }
        const preMobile = await users.findOne({ mobileNumber: mobileNumber });
        if (preMobile) {
            return res.status(400).json("User already exists with this mobile number");
        }
        const addUser = new users({
            firstName,
            lastName,
            email,
            mobileNumber,
            company,
            jobTitle
        });

        await addUser.save();
        return res.status(201).json(addUser); 
    } catch (error) {
        console.error(error);
        return res.status(500).json("Server error: " + error.message); 
    }
});

//GET USER DATA FRON DB
router.get("/contacts", async (req,res) => {
try {
    const userData = await users.find();
    res.status(201).json(userData);
    console.log(userData);
} catch (error) {
    return res.status(400).json(error);
}
})

//GET INDIVIDUAL USER
router.get("/contacts/:id", async(req,res) => {
    try {
        const {id} = req.params;
        const individualUser = await users.findById({_id:id});
        console.log(individualUser);
        res.status(201).json(individualUser);
    } catch (error) {
        res.status(422).json(error);
    }
})

//UPDATE USER DATA
router.put('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
  
    try {
      const updatedUser = await users.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
});

//DELETE USER DATA
router.delete("/contacts/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteUser = await users.findByIdAndDelete({_id:id});
        console.log(deleteUser);
        res.status(201).json(deleteUser);

    } catch (error) {
        res.status(422).json(error);
    }
})
  

module.exports = router;
