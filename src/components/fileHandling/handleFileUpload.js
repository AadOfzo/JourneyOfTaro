import axios from 'axios';

const handleFileUpload = async (file, fileType, additionalData, onSuccess, onError) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        Object.entries(additionalData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const response = await axios.post('http://localhost:8080/fileUpload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        onSuccess(response.data);
    } catch (error) {
        onError(error.response.data.message || 'An error occurred while uploading the file.');
    }
};

export const handleImageUpload = async (file, imageName, imageAltName) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // Ensure that the key used here matches the one expected in the backend

        // Append other form data parameters
        formData.append('imageName', imageName);
        formData.append('imageAltName', imageAltName);

        const response = await handleFileUpload(formData); // Await the promise returned by handleFileUpload

        console.log('Image upload successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const handleSongUpload = async (file, songTitle, artistName) => {
    try {
        const formData = new FormData();
        formData.append('file', file); // Ensure that the key used here matches the one expected in the backend

        // Append other form data parameters
        formData.append('songTitle', songTitle); // Ensure the key matches backend expectations ('songTitle')
        formData.append('artistName', artistName); // Assuming 'artistName' is an object with a 'getUsername' method

        const response = await handleFileUpload(formData); // Await the promise returned by handleFileUpload

        console.log('Song upload successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error uploading song:', error);
        throw error;
    }
};
