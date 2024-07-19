import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from "../../configs/utilities/axios/ApiService";
import UserDetails from "../../configs/users/UserDetails";
import ImageHandler from "../../configs/utilities/handlers/ImageHandler";

const UserProfile = ({ grantAdminPrivilege }) => {
    const { userId } = useParams(); // Get userId from route params
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
        <div>
            {userData && (
                <>
                    <UserDetails user={userData} grantAdminPrivilege={grantAdminPrivilege} />
                    <ImageHandler userId={userId} />
                </>
            )}
        </div>
    );
};

export default UserProfile;
