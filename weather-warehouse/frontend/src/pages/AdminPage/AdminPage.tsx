import { Box, Button, Paper, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';
import { useAcceptUserMutation } from '../../hooks/useAcceptUserMutation';
import { useDeleteUserMutation } from '../../hooks/useDeleteUserMutation';
import { useFetchUsersQuery } from '../../hooks/useFetchUsersQuery';
import { ContentBox } from '../../stlyes/content.style';
import { User } from '../../types/userData.type';


export function AdminPage() {
  const { mutateAsync: acceptUserMutatue } = useAcceptUserMutation();
  const { mutateAsync: deleteUserMutatue } = useDeleteUserMutation();
  const { data: users, error, isLoading, refetch } = useFetchUsersQuery();


  // await for the acceptUserMutation to complete before refetching
  // load userdata before accepting or deleting a user (usernotfound error)
  async function handleAcceptUser(id: number) {
    acceptUserMutatue(id)?.then(() => { refetch() });
  }

  async function handleDeleteUser(id: number) {
    deleteUserMutatue(id)?.then(() => { refetch() });
  }


  function renderShimmerTableContent() {
    for (let i = 0; i < 5; i++) {
      return (
        <TableRow key={i} data-testid="shimmerTableRow">
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
      );
    }
  }

  function renderShimmer() {
    if (isLoading) {
      return (
        <ContentBox>
          <Box p={3}>
            <Typography variant="h4" gutterBottom data-testid="userManagementTitle">
              User Management
            </Typography>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow data-testid="shimmerTableRowHeader">
                    <TableCell>User ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderShimmerTableContent()}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </ContentBox>
      );
    }
  }

  function renderError() {
    if (error) {
      return (
        <p>Error fetching data.</p>
      );
    }
  }

  function renderAcceptButton(user: User) {
    if (user.status === 'pending') {
      return (
        <Button
          variant="outlined"
          color="primary"
          sx={{ mr: 1 }}
          onClick={() => handleAcceptUser(user.userId)}
        >
          Accept
        </Button>
      );
    }
  }

  function renderDeleteButton(user: User) {
    if (!user.isAdmin) {
      return (
        <Button
          variant="outlined"
          color="error"
          onClick={() => handleDeleteUser(user.userId)}
        >
          Delete
        </Button>
      );
    }
  }

  function renderTableContent() {
    if (users && users.length > 0) {
      return users.map((user) => (
        <TableRow key={user.userId}>
          <TableCell>{user.userId}</TableCell>
          <TableCell>{user.username}</TableCell>
          <TableCell>{user.status}</TableCell>
          <TableCell align="right">
            {renderAcceptButton(user)}
            {renderDeleteButton(user)}
          </TableCell>
        </TableRow>
      ));
    }
  }

  function renderTable() {
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
                {renderTableContent()}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </ContentBox>
    );
  }

  return (
    <>
      {renderShimmer()}
      {renderError()}
      {renderTable()}
    </>
  )
}
