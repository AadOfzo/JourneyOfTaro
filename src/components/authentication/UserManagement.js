import React, { useState, useEffect } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(users => setUsers(users))
            .catch(error => console.error('Error fetching users:', error));
    };

    const grantAdminRights = (username) => {
        fetch(`http://localhost:8080/users${username}/authorities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ authority: 'ROLE_ADMIN' })
        })
            .then(response => {
                if (response.ok) {
                    alert('Admin rights granted successfully!');
                    // Refresh the user list after granting admin rights
                    fetchUsers();
                } else {
                    alert('Failed to grant admin rights.');
                }
            })
            .catch(error => console.error('Error granting admin rights:', error));
    };

    return (
        <div>
            <h1>User Management</h1>
            <div>
                {users.map(user => (
                    <div key={user.username}>
                        <p>{user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
                        <button onClick={() => grantAdminRights(user.username)}>Grant Admin Rights</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserManagement;
