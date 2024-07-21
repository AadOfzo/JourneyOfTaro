import React, { useState, useEffect } from 'react';
import UserComponent from "../../configs/users/UserComponent";
import UserDetails from "../../configs/users/UserDetails";
import { UserImage, UserListContainer, ImageContainer, NoImageContainer, NoImageIcon } from './styles.UserList'; // Update path if needed
import axios from "axios";

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    useEffect(() => {
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
        setSelectedUserId(event.target.value);
    };

    const renderUserImage = (imageUrl) => {
        if (imageUrl) {
            return <UserImage src={imageUrl} alt="User" />;
        } else {
            return (
                <NoImageContainer>
                    <NoImageIcon />
                    <p>No user image</p>
                </NoImageContainer>
            );
        }
    };

    return (
        <UserListContainer>
            <UserComponent onUserChange={handleUserChange} users={users} />
            {user && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {renderUserImage(user.imageUrl)}
                    <UserDetails user={user} />
                </div>
            )}
        </UserListContainer>
    );
};

export default UserProfile;
