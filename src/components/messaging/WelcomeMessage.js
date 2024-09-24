// WelcomeMessage.jsx
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'; // Assuming you're using styled-components for styling

const UserDetailLabel = styled.span`
  font-weight: bold;
`;

const UserDetailValue = styled.span`
  margin-left: 8px;
`;

const WelcomeMessage = ({ user, onBackToHome }) => {
    return (
        <div>
            <h3>Welcome!</h3>
            <table>
                <tbody>
                <tr>
                    <td><UserDetailLabel>Username:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.username}</UserDetailValue></td>
                </tr>
                <tr>
                    <td><UserDetailLabel>Roles:</UserDetailLabel></td>
                    <td><UserDetailValue>{user.roles.join(', ')}</UserDetailValue></td>
                </tr>
                </tbody>
            </table>
            <button onClick={onBackToHome}>Go to Home</button>
        </div>
    );
};

WelcomeMessage.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onBackToHome: PropTypes.func.isRequired,
};

export default WelcomeMessage;
