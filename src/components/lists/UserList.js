import React, { useState, useEffect, useCallback } from 'react';
import UserImageForm from "../forms/imageForm/UserImageForm";
import UserImageSelection from "../images/UserImageSelection";
import ApiService from "../../configs/utilities/axios/ApiService";
import {
    GlowingRow,
    UserImage as StyledUserImage,
    UserInfoContainer,
    UserInfo,
    ImageContainer,
    ExpandableContent,
} from './styles.UserList';
import {
    UploadImageButton,
    AssignImageButton,
    ImageCard,
    ImageTitle,
    UploadPreviewImage
} from './styles.UserProfile';

const UserList = ({ userRole }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const usersData = await ApiService.getUsers();

            // Fetch images for each user
            const usersWithImages = await Promise.all(
                usersData.map(async (user) => {
                    try {
                        const image = await ApiService.getUserImage(user.userId);
                        return { ...user, image: image.imageData, mimeType: image.mimeType };
                    } catch (error) {
                        console.error(`Error fetching image for user ${user.userId}:`, error);
                        return { ...user, image: null, mimeType: null };
                    }
                })
            );

            setUsers(usersWithImages);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleUploadButtonClick = (userId) => {
        setSelectedUserId(userId);
        setShowUploadForm(!showUploadForm);
    };

    const handleAssignButtonClick = (userId) => {
        setSelectedUserId(userId);
        setShowAssignForm(!showAssignForm);
    };

    const handleImageUploaded = () => {
        setShowUploadForm(false);
        fetchUsers();
    };

    const handleImageSelected = () => {
        setShowAssignForm(false);
        fetchUsers();
    };

    const grantAdminRights = async (username) => {
        if (!window.confirm(`Are you sure you want to grant admin rights to ${username}?`)) {
            return;
        }

        try {
            await ApiService.grantAdminPrivilege(username);
            alert('Admin rights granted successfully!');
            fetchUsers(); // Refetch users after granting admin rights
        } catch (error) {
            console.error('Error granting admin rights:', error);
            alert('Failed to grant admin rights.');
        }
    };

    return (
        <div className="user-list">
            {loading && <p>Loading users...</p>}
            {error && <p>{error}</p>}
            {users.map((user) => (
                <GlowingRow key={user.userId}>
                    <UserInfoContainer>
                        <StyledUserImage>
                            {user.image ? (
                                <img
                                    src={`data:${user.mimeType};base64,${user.image}`}
                                    alt={`Profile of ${user.username}`}
                                />
                            ) : (
                                <span>No Image</span>
                            )}
                        </StyledUserImage>
                        <UserInfo>
                            <h3>{user.username}</h3>
                            <p>Email: {user.email}</p>
                        </UserInfo>
                    </UserInfoContainer>
                    <ImageContainer>
                        <UploadImageButton onClick={() => handleUploadButtonClick(user.userId)}>
                            Upload Image
                        </UploadImageButton>
                        <AssignImageButton onClick={() => handleAssignButtonClick(user.userId)}>
                            Assign Image
                        </AssignImageButton>
                        {user.images && user.images.length > 0 && (
                            <div>
                                <h4>Images:</h4>
                                <div>
                                    {user.images.map((image) => (
                                        <ImageCard key={image.id}>
                                            <UploadPreviewImage src={`data:${image.mimeType};base64,${image.imageData}`} alt={image.imageName} />
                                            <ImageTitle>{image.imageName}</ImageTitle>
                                        </ImageCard>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ImageContainer>
                    {userRole === 'ROLE_ADMIN' && (
                        <button onClick={() => grantAdminRights(user.username)}>Grant Admin Rights</button>
                    )}
                </GlowingRow>
            ))}
        </div>
    );
};

export default UserList;
