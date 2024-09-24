import React from 'react';
import axios from 'axios';
import UserDetails from './UserDetails';  // Ensure the correct path
import { CenteredH2, UserListContainer } from './styles.UserComponent';  // Ensure the correct path

const UserComponent = ({ users = [], onUserChange }) => {
    const [selectedUserId, setSelectedUserId] = React.useState(1);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (selectedUserId) {
            axios.get(`http://localhost:8080/users/${selectedUserId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error(`There was an error fetching the user with ID ${selectedUserId}!`, error);
                });
        }
    }, [selectedUserId]);

    const handleUserChange = (event) => {
        const userId = event.target.value;
        setSelectedUserId(userId);
        if (onUserChange) {
            onUserChange(event);
        }
    };

    return (
        <UserListContainer>
            <CenteredH2>User Information</CenteredH2>
            <label htmlFor="user-select">Select User: </label>
            <select id="user-select" onChange={handleUserChange} value={selectedUserId}>
                {users.map(user => (
                    <option key={user.userId} value={user.userId}>
                        {user.username}
                    </option>
                ))}
            </select>

            {/*{user && <UserDetails user={user} />}*/}
        </UserListContainer>
    );
};

export default UserComponent;
