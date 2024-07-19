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
    const [createdUserId, setCreatedUserId] = useState(null);

    useEffect(() => {
        console.log("createdUserId updated:", createdUserId);
    }, [createdUserId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.createUser(formData);
            setSuccessMessage('User created successfully.');
            setShowPopup(true);
            setCreatedUsername(formData.username);
            setCreatedUserId(response.data.id); // Store the user ID from the backend response
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
        } catch (error) {
            setErrorMessage('Failed to create user. Please try again.');
        }
    };

    const handleLogin = () => {
        navigate('/');
    };

    const handleYes = async () => {
        setShowPopup(false);
        setShowImageForm(true);
    };

    const handleNo = () => {
        setShowPopup(false);
        handleLogin();
    };

    const handleImageUploaded = () => {
        console.log("Image uploaded: Showing user profile");
        setShowImageForm(false); // Hide the image form after upload
    };

    const handleCountryChange = (e) => {
        setFormData({ ...formData, country: e.target.value });
    };

    return (
        <SUserForm>
            {showPopup ? (
                <PopUp1
                    message="Thank you for signing up! Would you like to login or upload a profile image?"
                    onYes={handleYes} // Show image upload form on 'Yes'
                    onNo={handleNo}
                />
            ) : showImageForm && createdUserId ? (
                <ImageForm userId={createdUserId} onImageUploaded={handleImageUploaded} />
            ) : createdUserId ? (
                <UserProfile username={createdUsername} />
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
                    <div className="form-group">
                        <CountryMenu
                            selectedCountry={formData.country}
                            onCountryChange={handleCountryChange}
                        />
                    </div>
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
