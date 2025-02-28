import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

interface User {
    id: number;
    username: string;
    status: "pending" | "active";
}

export function AdminPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers: User[] = [
            { id: 1, username: 'John Doe', status: 'pending' },
            { id: 2, username: 'Jane Smith', status: 'active' },
            { id: 3, username: 'Bob Johnson', status: 'pending' }
        ];
        setUsers(fetchUsers);
    }, []);

    const acceptUser = (id: number) => {
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === id ? { ...user, status: 'active' } : user
            )
        );
    };

    const deleteUser = (id: number) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                Admin - User Management
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
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.status}</TableCell>
                                <TableCell align="right">
                                    {user.status === 'pending' && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            sx={{ mr: 1 }}
                                            onClick={() => acceptUser(user.id)}
                                        >
                                            Accept
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {users.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    No users found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
}
