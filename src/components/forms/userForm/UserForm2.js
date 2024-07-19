import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SUserForm from './styles.UserForm';
import ApiService from "../../../configs/utilities/axios/ApiService";
import CountryMenu from "../../countryMenu/CountryMenu";
import UserProfile from "../../lists/UserProfile";
import Login from "../../login/Login";

const UserForm2 = () => {
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
    const [createdUserId, setCreatedUserId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userPayload = {
            ...formData,
            authorities: 'USER', // Assigning the user authority
        };

        try {
            const response = await ApiService.createUser(userPayload);
            console.log(response);
            // const { id, jwt } = response.data; // Expecting the backend to return JWT and user ID
            //
            // // Save JWT token in local storage or state
            // localStorage.setItem('token', jwt);
            //
            setSuccessMessage('Your account has been created successfully. Please Login');
            // setErrorMessage(''); // Clear error message
            // setCreatedUserId(id); // Store the user ID from the backend response
            // setFormData({
            //     username: '',
            //     password: '',
            //     firstname: '',
            //     lastname: '',
            //     dateofbirth: '',
            //     country: '',
            //     email: '',
            //     artistname: '',
            // });
        } catch (error) {
            console.log(error);
            setSuccessMessage(''); // Clear success message
            setErrorMessage('Failed to create user. Please try again.');
        }
    };

    const handleCountryChange = (e) => {
        setFormData({ ...formData, country: e.target.value });
    };

    if (createdUserId) {
        return <UserProfile userId={createdUserId} />;
    }

    return (
        <SUserForm>
            {successMessage ? (
                <>
                    <p>{successMessage}</p>
                    <Login/>
                </>
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
                    {errorMessage && <p>{errorMessage}</p>}
                </form>
            )}
        </SUserForm>
    );
};

export default UserForm2;
