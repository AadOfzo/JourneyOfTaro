import React, { useState, useEffect } from 'react';
import ApiService from "../../configs/utilities/axios/ApiService";

function UserDetails2() {
    const [users, setUsers] = useState([]);
    const [ setSelectedUserId ] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the list of users using ApiService
        const fetchUsers = async () => {
            try {
                const usersData = await ApiService.fetchUsers();
                setUsers(usersData);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
                setError('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelection = async (userId) => {
        setLoading(true);
        setError(null);
        setSelectedUserId(userId);

        try {
            const userResponse = await ApiService.fetchUserById(userId);
            setUserDetails(userResponse);

            const imageResponse = await ApiService.getUserImage(userId);
            const imageUrl = URL.createObjectURL(imageResponse.data);

            console.log("Generated Image URL:", imageUrl);
            setUserImage(imageUrl);
        } catch (error) {
            if (error.message === 'Token is missing') {
                // Redirect to login or show login modal
                console.log("Redirecting to login...");
            } else {
                setError('Error fetching user details or image.');
            }
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Select a User</h2>
            <select onChange={(e) => handleUserSelection(e.target.value)}>
                <option value="">--Select User--</option>
                {users.map(user => (
                    <option key={user.userId} value={user.userId}>
                        {user.username}
                    </option>
                ))}
            </select>

            {loading && <p>Loading user details...</p>}
            {error && <p>{error}</p>}

            {userDetails && (
                <div>
                    <h3>User Details</h3>
                    <p><strong>Username:</strong> {userDetails.username}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Artist Name:</strong> {userDetails.artistname}</p>
                    {/* Add more user details as needed */}
                    {userImage ? (
                        <div>
                            <h4>User Image</h4>
                            <img src={userImage} alt={`${userDetails.username}'s image`} style={{ maxWidth: '200px' }} />
                        </div>
                    ) : (
                        <p>No image available for this user.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserDetails2;
