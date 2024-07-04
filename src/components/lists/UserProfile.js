import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageForm from "../forms/imageForm/ImageForm";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    GlowingRow,
    UserImage as StyledUserImage,
} from './styles.UserList';

const UserProfile = ({ username }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndImage = async () => {
            if (!username) {
                setError('Username is undefined.');
                setLoading(false);
                return;
            }

            try {
                const userResponse = await axios.get(`http://localhost:8080/users/${username}`);
                setUser(userResponse.data);

                const imageResponse = await ApiService.getImageFromUser(userResponse.data.userId);
                setImage({
                    imageData: imageResponse.data,
                    mimeType: imageResponse.headers['content-type']
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserAndImage();
    }, [username]);

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
                        <StyledUserImage
                            src={`data:${image.mimeType};base64,${image.imageData}`}
                            alt="User Image"
                        />
                    ) : (
                        <ImageForm username={username} onImageUploaded={() => window.location.reload()} />
                    )}
                </div>
            )}
        </div>
    );
};

export default UserProfile;
