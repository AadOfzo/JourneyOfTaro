import React, { useState, useEffect, useRef } from 'react';
import ApiService from '../../configs/utilities/axios/ApiService';
import UserDetails from '../../configs/users/UserDetails';
import {
    AccountContainer,
    AccountDetailsForm,
    InputField,
    UpdateButton,
    CenteredH2,
} from './styles.UserAccount';
import {
    NoImageContainer,
    NoImageIcon,
    UploadButton
} from '../../configs/users/styles.UserComponent';

function UserAccount() {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [file, setFile] = useState(null);
    const [buttonText, setButtonText] = useState("Upload Image");
    const [imageUrl, setImageUrl] = useState(null);

    const fileInputRef = useRef(null);

    const userId = localStorage.getItem('userId'); // Ensure this key matches what is stored

    useEffect(() => {
        if (userId) {
            fetchUserDetails();
            fetchUserImage(userId);
        } else {
            setError('User ID is missing.');
            setLoading(false);
        }
    }, [userId]);

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

    const fetchUserImage = async (userId) => {
        try {
            const imageResponse = await ApiService.getUserImage(userId);
            setImageUrl(URL.createObjectURL(imageResponse.data));
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // No image found, set URL to null
                setImageUrl(null);
            } else {
                // Handle other errors
                console.error('Error fetching user image:', error);
                setImageUrl(null); // Fallback if there's an error
            }
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

    const handleNoImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setButtonText("Add Image");
    };

    const handleUploadClick = async () => {
        if (file && userId) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                await ApiService.addUserImage(userId, file);
                setFile(null);
                setButtonText("Upload Image");
                fetchUserImage(userId); // Refresh user image
            } catch (error) {
                console.error('Error uploading the image:', error);
            }
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
                    <UserDetails user={userDetails} imageUrl={imageUrl} />
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
                    <NoImageContainer
                        hasImage={!!file}
                        imageUrl={file ? URL.createObjectURL(file) : null}
                        onClick={handleNoImageClick}
                    >
                        {!file && <NoImageIcon />}
                        <p>{!file ? 'No user image' : ''}</p>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <UploadButton file={file} onClick={handleUploadClick}>
                            {buttonText}
                        </UploadButton>
                    </NoImageContainer>
                </>
            )}
        </AccountContainer>
    );
}

export default UserAccount;
