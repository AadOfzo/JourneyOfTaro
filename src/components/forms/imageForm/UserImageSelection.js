import React, { useState, useEffect } from 'react';
import ApiService from "../../../configs/utilities/axios/ApiService";
import ImageGallery from "../../images/ImageGallery";

const UserImageSelection = ({ userId, onImageSelected }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [errorUsers, setErrorUsers] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoadingUsers(true);
        try {
            const usersResponse = await ApiService.get('http://localhost:8080/users');
            setUsers(usersResponse.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setErrorUsers('Error fetching users. Please try again later.');
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image);
    };

    const assignImageToUser = async () => {
        if (!selectedImage) {
            alert('Please select an image.');
            return;
        }

        try {
            await ApiService.getUserImage(userId, selectedImage.id);
            alert(`Image '${selectedImage.imageName}' assigned to user.`);
            onImageSelected(); // Callback to refresh data
        } catch (error) {
            console.error('Error assigning image to user:', error);
            alert('Error assigning image to user. Please try again.');
        }
    };

    return (
        <div className="user-image-selection">
            <h2>Select Image for User</h2>
            <div>
                <label>Select User:</label>
                <select>
                    {loadingUsers ? (
                        <option>Loading...</option>
                    ) : errorUsers ? (
                        <option>Error loading users</option>
                    ) : (
                        users.map(user => (
                            <option key={user.userId} value={user.userId}>{user.username}</option>
                        ))
                    )}
                </select>
            </div>
            <div>
                <h3>Image Gallery</h3>
                <ImageGallery onImageSelect={handleImageSelect} />
            </div>
            <div>
                <button onClick={assignImageToUser}>Assign Image</button>
            </div>
        </div>
    );
};

export default UserImageSelection;