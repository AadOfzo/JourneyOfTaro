// src/components/users/styles.UserAccount.js

import styled from 'styled-components';

// Container for the entire account section
export const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 0 auto;
`;

// Heading for the account section
export const CenteredH2 = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
`;

// Form for user details
export const AccountDetailsForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`;

// Input field styling
export const InputField = styled.input`
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
`;

// Button styling
export const UpdateButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    margin-top: 10px;

    &:hover {
        background-color: #0056b3;
    }
`;
