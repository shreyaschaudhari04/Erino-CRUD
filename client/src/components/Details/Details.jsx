import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, CardActions, Typography, Button, Container, Box, Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './Details.css';
import Navbar from "../Navbar/Navbar"


const Details = () => {

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const navigate = useNavigate();
  const { id } = useParams();  
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/contacts/${id}`, { method: 'GET' });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error("User not found:", data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEdit = () => {
    navigate(`/edit/${id}`); 
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        console.log("User Deleted");
        navigate('/');
      } else {
        const errorData = await res.json();
        console.error("Failed to delete user:", errorData);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
  <Navbar></Navbar>
    <Container maxWidth="lg" className="details-container">
      <Button onClick={handleGoHome} variant="contained" color="secondary" style={{ marginBottom: '450px' }}>
        Back to Home
      </Button>

      <Card className="details-card">
        <CardContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar src={user.profilePic || 'https://www.w3schools.com/howto/img_avatar.png'} sx={{ width: 100, height: 100 }} />
          </Box>
          <Typography variant="h4" gutterBottom>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {user.jobTitle} at {user.company}
          </Typography>
          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Mobile:</strong> {user.mobileNumber}
            </Typography>
          </Box>
        </CardContent>

        <CardActions className="details-actions">
          <Button size="small" variant="contained" color="primary" startIcon={<EditIcon />} onClick={handleEdit}>
            Edit
          </Button>
          <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} onClick={() => deleteUser(id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Container>
    </>
  );
};

export default Details;
