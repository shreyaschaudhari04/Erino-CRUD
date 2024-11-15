import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Box, Typography, Container } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; 
import { NavLink } from 'react-router-dom';
import '../Register/Register.css';
import Navbar from "../Navbar/Navbar"

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();  

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`/contacts/${id}`, { method: 'GET' });
        const data = await res.json();
        if (res.ok) {
          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            mobileNo: data.mobileNumber,
            company: data.company,
            jobTitle: data.jobTitle,
          });
        } else {
          console.error("User not found:", data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate('/');  
      } else {
        console.error("Error updating user:", data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
    <Navbar></Navbar>
      <NavLink to="/">Home</NavLink>

      <Container maxWidth="lg" className="register-container">
        <Typography variant="h4" className="register-title">
          Edit User
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          className="register-form-box"
        >
          <Grid container spacing={3}>
            {/* First Name and Last Name */}
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

            {/* Email and Mobile Number */}
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
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                fullWidth
                required
                className="register-input"
              />
            </Grid>

            {/* Company Name and Job Title */}
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

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="register-button"
          >
            Save Changes
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Edit;
