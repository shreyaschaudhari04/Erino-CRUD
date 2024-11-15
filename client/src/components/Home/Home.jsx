import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addData } from '../context/ContextProvider';
import { Alert, AlertTitle } from '@mui/material';
import Navbar from '../Navbar/Navbar'; 
import '../Home/Home.css';

const Home = () => {
  const [getUserData, setUserData] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const { userData, setUData } = useContext(addData);
  const navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'mobileNumber', headerName: 'Mobile Number', width: 130 },
    { field: 'company', headerName: 'Company', width: 130 },
    { field: 'jobTitle', headerName: 'Job Title', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="primary" style={{ marginRight: 10 }}>
            <NavLink to={`/details/${params.row._id}`} style={{ color: 'inherit' }}>
              <VisibilityIcon />
            </NavLink>
          </IconButton>

          <IconButton color="secondary" style={{ marginRight: 10 }}>
            <NavLink to={`/edit/${params.row._id}`} style={{ color: 'inherit' }}>
              <EditIcon />
            </NavLink>
          </IconButton>

          <IconButton color="error" onClick={() => deleteUser(params.row._id)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const handleRedirect = () => {
    navigate('/register');
  };

  const getUsers = async () => {
    try {
      const res = await fetch("/contacts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 400 || !data) {
        console.log("Error:", data);
      } else {
        const usersWithIds = data.map((user, index) => ({
          ...user,
          id: index + 1,
          mobileNumber: user.mobileNumber.toString(),
        }));
        setUserData(usersWithIds);
        console.log("Get Data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`/contacts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const deleteData = await res.json();

      if (res.status === 422 || !deleteData) {
        setAlert({
          open: true,
          message: 'Failed to delete user',
          severity: 'error',
        });
      } else {
        setAlert({
          open: true,
          message: 'User deleted successfully',
          severity: 'success',
        });
        getUsers();
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        open: true,
        message: 'An unexpected error occurred while deleting',
        severity: 'error',
      });
    }
  };

  const handleAlertClose = () => {
    setAlert({ open: false, message: '', severity: '' });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredUsers = getUserData.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mobileNumber.includes(searchQuery)
  );

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="container">
        <div className="add-btn">
          <Button variant="contained" onClick={handleRedirect}>Add User</Button>
        </div>

        {alert.open && (
          <Alert
            severity={alert.severity}
            onClose={handleAlertClose}
            sx={{ marginBottom: '16px' }}
          >
            <AlertTitle>{alert.severity === 'success' ? 'Success' : 'Error'}</AlertTitle>
            {alert.message}
          </Alert>
        )}

        <Paper sx={{ height: 400, width: '100%', mt: '20px' }}>
          <DataGrid
            rows={filteredUsers}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 20, 30, 50]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </div>
    </>
  );
};

export default Home;
