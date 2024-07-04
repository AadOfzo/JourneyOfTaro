import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUserData(response.data); // Assuming the backend returns user data including image URL
                setLoading(false);
            } catch (error) {
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
        <div>
            <h2>User Profile</h2>
            {userData && (
                <div>
                    <img src={userData.userimage} alt="User" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                    <div>
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>First Name:</strong> {userData.firstname}</p>
                        <p><strong>Last Name:</strong> {userData.lastname}</p>
                        <p><strong>Date of Birth:</strong> {userData.dateofbirth}</p>
                        <p><strong>Country:</strong> {userData.country}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Artist Name:</strong> {userData.artistname}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
