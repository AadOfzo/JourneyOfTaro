import React from 'react';
import {
    UserDetailsContainer, UserDetail, UserDetailLabel, UserDetailValue
} from './styles.UserComponent';

const UserDetails = ({ user, imageUrl }) => {
    return (
        <UserDetailsContainer>
            <table>
                <tbody>
                {imageUrl && (
                    <tr>
                        <td colSpan="2">
                            <img src={imageUrl} alt={`${user.username}'s image`} style={{ maxWidth: '200px' }} />
                        </td>
                    </tr>
                )}
                <tr>
                    <td><UserDetailLabel>First Name:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.firstname}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Last Name:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.lastname}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Username:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.username}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Email:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.email}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Country:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.country}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Artist Name:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.artistname}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>API Key:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.apikey}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Roles:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.roles.join(', ')}</UserDetailValue></td>
                </tr>
                </tbody>
            </table>
        </UserDetailsContainer>
    );
};

export default UserDetails;
