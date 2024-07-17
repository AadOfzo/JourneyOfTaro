import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PopUp1 from '../../popup/PopUp1';
import SUserForm from './styles.UserForm';
import ImageForm from "../imageForm/ImageForm";
import UserProfile from "../../lists/UserProfile";
import ApiService from "../../../configs/utilities/axios/ApiService";
import CountryMenu from "../../countryMenu/CountryMenu";

const UserForm3 = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        dateofbirth: '',
        country: '',
        email: '',
        artistname: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showImageForm, setShowImageForm] = useState(false);
    const [createdUsername, setCreatedUsername] = useState('');
    const [jwtToken, setJwtToken] = useState('');

    useEffect(() => {
        console.log("JWT token:", jwtToken);
    }, [jwtToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createUser(formData);
            console.log('User creation response:', response);

            if (response && response.status === 201) {
                setSuccessMessage('User created successfully.');
                setShowPopup(true);
                setCreatedUsername(formData.username);
                setFormData({
                    username: '',
                    password: '',
                    firstname: '',
                    lastname: '',
                    dateofbirth: '',
                    country: '',
                    email: '',
                    artistname: '',
                });
            } else {
                setErrorMessage('Failed to create user. Unexpected response format.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                setErrorMessage(`Failed to create user. ${error.response.data.message || 'Please try again.'}`);
            } else if (error.request) {
                console.error('No response from server:', error.request);
                setErrorMessage('Failed to create user. No response from server.');
            } else {
                console.error('Error creating user:', error.message);
                setErrorMessage(`Failed to create user. ${error.message}`);
            }
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    const handleYes = async () => {
        setShowPopup(false);
        try {
            const tokenResponse = await ApiService.obtainJwtToken(createdUsername, formData.password);
            console.log('JWT Token response:', tokenResponse);

            if (tokenResponse && tokenResponse.data && tokenResponse.data.jwtToken) {
                setJwtToken(tokenResponse.data.jwtToken);
                setShowImageForm(true);
            } else {
                setErrorMessage('Failed to obtain JWT token.');
            }
        } catch (error) {
            console.error('Error obtaining JWT token:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                setErrorMessage(`Failed to obtain JWT token. ${error.response.data.message || 'Please try again.'}`);
            } else if (error.request) {
                console.error('No response from server:', error.request);
                setErrorMessage('Failed to obtain JWT token. No response from server.');
            } else {
                console.error('Error obtaining JWT token:', error.message);
                setErrorMessage(`Failed to obtain JWT token. ${error.message}`);
            }
        }
    };

    const handleNo = () => {
        setShowPopup(false);
        handleLogin();
    };

    const handleImageUploaded = () => {
        setShowImageForm(false);
        // Optionally, redirect or show user profile after image upload
    };

    return (
        <SUserForm>
            {showPopup ? (
                <PopUp1
                    message="Thank you for signing up! Would you like to login or upload a profile image?"
                    onYes={handleYes}
                    onNo={handleNo}
                />
            ) : showImageForm ? (
                <ImageForm
                    jwtToken={jwtToken}
                    userId={createdUsername} // Assuming userId can be used to identify user for image upload
                    onImageUploaded={handleImageUploaded}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="Enter username"
                            autoComplete="username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                    </div>
                    <div className="form-group">
                        <label>First name:</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                            placeholder="Enter first name"
                            autoComplete="given-name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Last name:</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                            placeholder="Enter last name"
                            autoComplete="family-name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Date of birth:</label>
                        <input
                            type="date"
                            name="dateofbirth"
                            value={formData.dateofbirth}
                            onChange={(e) => setFormData({ ...formData, dateofbirth: e.target.value })}
                            autoComplete="birthday"
                        />
                    </div>
                    <CountryMenu
                        selectedCountry={formData.country}
                        onCountryChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="Enter email"
                            autoComplete="email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Artist name:</label>
                        <input
                            type="text"
                            name="artistname"
                            value={formData.artistname}
                            onChange={(e) => setFormData({ ...formData, artistname: e.target.value })}
                            placeholder="Enter artist name"
                            autoComplete="artist-name"
                        />
                    </div>
                    <button type="submit">Submit</button>
                    {successMessage && <p>{successMessage}</p>}
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            )}
        </SUserForm>
    );
};

export default UserForm3;
