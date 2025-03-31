import React, { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAlert } from '../../utils/AlertContext';
import { ContentBox } from '../../stlyes/content.style';

interface User {
  userId: number;
  username: string;
  status: string;
}

// Define a type for your decoded token payload
interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export function AdminPage() {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      showAlert('Access Denied. Admins only.', 'error');
      navigate('/');
      return;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.role !== 'admin') {
        showAlert('Access Denied. Admins only.', 'error');
        navigate('/');
      }
    } catch (error) {
      showAlert('Invalid session. Access Denied.', 'error');
      navigate('/');
    }
  }, [navigate, showAlert]);

  const { data: users, error, isLoading, refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get('/user/data');
      return response.data;
    }
  });

  const acceptUser = async (userId: number) => {
    try {
      await axios.post('/user/accept', { id: userId });
      showAlert('User accepted successfully', 'success');
      refetch();
    } catch (error) {
      console.error('Error accepting user:', error);
      showAlert('Failed to accept user', 'error');
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await axios.delete('/user/delete', { data: { id: userId } });
      showAlert('User deleted successfully', 'success');
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
      showAlert('Failed to delete user', 'error');
    }
  };

  if (isLoading) {
    return (
      <ContentBox>
        <Box p={3}>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" width={50} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rectangular" width={100} height={30} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </ContentBox>
    );
  }

  if (error) {
    return (
      <p>Error fetching data.</p>
    );
  }

  return (
    <ContentBox>
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell align="right">
                      {user.status === 'pending' && (
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ mr: 1 }}
                          onClick={() => acceptUser(user.userId)}
                        >
                          Accept
                        </Button>
                      )}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteUser(user.userId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </ContentBox>
  );
}
