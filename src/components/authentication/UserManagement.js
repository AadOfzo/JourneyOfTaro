import React, { useState } from 'react';
import UseUsers from "../../hooks/UseUsers";

const UserManagement = ({ userRole }) => {
    const { users, loading, error } = UseUsers(`${process.env.REACT_APP_API_URL}/users`);

    const grantAdminRights = (username) => {
        if (!window.confirm(`Are you sure you want to grant admin rights to ${username}?`)) {
            return;
        }

        fetch(`${process.env.REACT_APP_API_URL}/users/${username}/authorities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authority: 'ROLE_ADMIN' })
        })
            .then(response => {
                if (response.ok) {
                    alert('Admin rights granted successfully!');
                    // Refetch users after granting admin rights
                } else {
                    alert('Failed to grant admin rights.');
                }
            })
            .catch(error => {
                console.error('Error granting admin rights:', error);
                alert('Error granting admin rights.');
            });
    };

    return (
        <div>
            <h1>User Management</h1>
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    {users.map(user => (
                        <div key={user.username}>
                            <p>{user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
                            {userRole === 'ROLE_ADMIN' && (
                                <button onClick={() => grantAdminRights(user.username)}>Grant Admin Rights</button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserManagement;
