import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    UserInfoContainer,
    UserInfo,
    UserDetailLabel,
    UserDetailValue,
    ImageContainer,
    Image,
} from './styles.UserList'; // Import appropriate styles

const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const user = await ApiService.getUserById(userId);
                setUserData(user);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data.');
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return <p>Loading user profile...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <UserInfoContainer>
            <h2>User Profile</h2>
            {userData && (
                <UserInfo>
                    <ImageContainer>
                        {userData.userimage && (
                            <Image
                                src={`data:${userData.userimage.mimeType};base64,${userData.userimage.imageData}`}
                                alt="User"
                            />
                        )}
                    </ImageContainer>
                    <div>
                        <UserDetailLabel>Username:</UserDetailLabel>
                        <UserDetailValue>{userData.username}</UserDetailValue>
                        <UserDetailLabel>First Name:</UserDetailLabel>
                        <UserDetailValue>{userData.firstName}</UserDetailValue>
                        <UserDetailLabel>Last Name:</UserDetailLabel>
                        <UserDetailValue>{userData.lastName}</UserDetailValue>
                        <UserDetailLabel>Date of Birth:</UserDetailLabel>
                        <UserDetailValue>{userData.dateOfBirth}</UserDetailValue>
                        <UserDetailLabel>Country:</UserDetailLabel>
                        <UserDetailValue>{userData.country}</UserDetailValue>
                        <UserDetailLabel>Email:</UserDetailLabel>
                        <UserDetailValue>{userData.email}</UserDetailValue>
                        <UserDetailLabel>Artist Name:</UserDetailLabel>
                        <UserDetailValue>{userData.artistName}</UserDetailValue>
                        <UserDetailLabel>Songs:</UserDetailLabel>
                        <UserDetailValue>{userData.songTitle}</UserDetailValue>
                    </div>
                </UserInfo>
            )}
        </UserInfoContainer>
    );
};

export default UserProfile;
