import React, { useState, useEffect } from 'react';
import ApiService from '../../configs/utilities/axios/ApiService';
import UserDetails from "../../configs/users/UserDetails";
import {
    AccountContainer,
    AccountDetailsForm,
    InputField,
    UpdateButton,
    CenteredH2
} from './styles.UserAccount';

function UserAccount() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    // Mock user ID for demonstration, replace this with actual logic
    const userId = '12345'; // Replace with logic to get the actual user ID

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const response = await ApiService.fetchUserById(userId);
            setUserDetails(response);
        } catch (error) {
            console.error('Error fetching user details:', error);
            setError('Error fetching user details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService.updateUser(userId, userDetails);
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000); // Hide success message after 3 seconds
        } catch (error) {
            console.error('Error updating user details:', error);
            setError('Error updating user details. Please try again later.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AccountContainer>
            <CenteredH2>Your Account</CenteredH2>
            {error && <p>{error}</p>}
            {userDetails && (
                <>
                    <UserDetails user={userDetails} /> {/* Render UserDetails component */}
                    <AccountDetailsForm onSubmit={handleFormSubmit}>
                        <InputField
                            type="text"
                            name="username"
                            value={userDetails.username || ''}
                            onChange={handleInputChange}
                            placeholder="Username"
                            disabled
                        />
                        <InputField
                            type="email"
                            name="email"
                            value={userDetails.email || ''}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        <InputField
                            type="text"
                            name="firstName"
                            value={userDetails.firstName || ''}
                            onChange={handleInputChange}
                            placeholder="First Name"
                        />
                        <InputField
                            type="text"
                            name="lastName"
                            value={userDetails.lastName || ''}
                            onChange={handleInputChange}
                            placeholder="Last Name"
                        />
                        <UpdateButton type="submit">Update Details</UpdateButton>
                        {updateSuccess && <p>Account details updated successfully!</p>}
                    </AccountDetailsForm>
                </>
            )}
        </AccountContainer>
    );
}

export default UserAccount;
