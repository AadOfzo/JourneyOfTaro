import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";
import { fetchUserDetails } from "../../configs/utilities/AuthorisationUtilities";
import {
    UserImage as StyledUserImage,
} from './styles.UserList';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndImage = async () => {
            if (!userId) {
                setError('User ID is undefined.');
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem('token'); // Replace with your actual token handling logic
                const userData = await fetchUserDetails(userId, token, setUserDetails);
                setUser(userData);

                const { imageData, mimeType } = await ApiService.getImageFromUser(userId);
                setImage({ imageData, mimeType });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndImage();
    }, [userId]);

    const setUserDetails = (username, role) => {
        console.log(`Setting username: ${username}, role: ${role}`);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>First Name: {user.firstName}</p>
                    <p>Last Name: {user.lastName}</p>
                    <p>Date of Birth: {user.dateOfBirth}</p>
                    <p>Country: {user.country}</p>
                    <p>Email: {user.email}</p>
                    <p>Artist Name: {user.artistName}</p>
                    {image ? (
                        <StyledUserImage src={`data:${image.mimeType};base64,${image.imageData}`} alt="User Image" />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
