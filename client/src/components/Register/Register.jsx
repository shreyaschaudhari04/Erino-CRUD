import React, { useContext, useState } from 'react';
import { TextField, Button, Grid, Box, Typography, Container } from '@mui/material';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { addData } from '../context/ContextProvider';
import Navbar from "../Navbar/Navbar"

const Register = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    company: '',
    jobTitle: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addUser = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, mobileNumber, company, jobTitle } = formData;

    try {
      const res = await fetch(`${BASE_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName, lastName, email, mobileNumber, company, jobTitle,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("User Added Successfully");
        navigate('/');
        console.log("Data Added", data);
      } else {
        alert("Error: " + (data.message || "Failed to add user"));
        console.log("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    }
  }

  return (
    <>
    <Navbar></Navbar>
      <NavLink to="/">Home</NavLink>

      <Container maxWidth="lg" className="register-container">
        <Typography variant="h4" className="register-title">
          Register New User
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="register-form-box"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="First Name"
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="Last Name"
                variant="outlined"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>

            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="Mobile Number"
                variant="outlined"
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>

            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="Company Name"
                variant="outlined"
                name="company"
                value={formData.company}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>
            <Grid item xs={12} sm={6} className="register-grid-item">
              <TextField
                label="Job Title"
                variant="outlined"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="register-button"
            onClick={addUser}
          >
            Register User
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Register;
