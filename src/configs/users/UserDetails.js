import React from 'react';
import {
    UserDetailsContainer,
    UserInfoContainer,
    UserInfo,
    UserDetail,
    UserDetailLabel,
    UserDetailValue,
    ExpandButton
} from '../../components/lists/styles.UserList';

const UserDetails = ({ user, grantAdminPrivilege }) => (
    <UserDetailsContainer>
        <UserInfoContainer>
            <UserInfo>
                <UserDetail>
                    <UserDetailLabel>Role:</UserDetailLabel>
                    <UserDetailValue>{user.roles.join(', ')}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>API Key:</UserDetailLabel>
                    <UserDetailValue>{user.apikey}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>First Name:</UserDetailLabel>
                    <UserDetailValue>{user.firstname}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>Last Name:</UserDetailLabel>
                    <UserDetailValue>{user.lastname}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>Country:</UserDetailLabel>
                    <UserDetailValue>{user.country}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>Email:</UserDetailLabel>
                    <UserDetailValue>{user.email}</UserDetailValue>
                </UserDetail>
                <UserDetail>
                    <UserDetailLabel>Artist Name:</UserDetailLabel>
                    <UserDetailValue>{user.artistname}</UserDetailValue>
                </UserDetail>
                <ExpandButton onClick={() => grantAdminPrivilege(user.username)}>
                    Add Admin
                </ExpandButton>
            </UserInfo>
        </UserInfoContainer>
    </UserDetailsContainer>
);

export default UserDetails;
