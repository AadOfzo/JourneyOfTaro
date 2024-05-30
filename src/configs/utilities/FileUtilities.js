import axios from 'axios';

export const fetchImages = async () => {
    try {
        const response = await axios.get('http://localhost:8080/images');
        return response.data;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
};

export const fetchSongs = async () => {
    try {
        const response = await axios.get('http://localhost:8080/songs');
        return response.data;
    } catch (error) {
        console.error('Error fetching songs:', error);
        throw error;
    }
};

export const deleteItem = async (url, id) => {
    try {
        await axios.delete(`${url}/${id}`);
    } catch (error) {
        console.error(`Error deleting item from ${url}:`, error);
        throw error;
    }
};

export const handleFileChange = (e, setFormData, formData) => {
    setFormData({
        ...formData,
        file: e.target.files[0],
    });
};

export const handleDragEnter = (e, setDragOver) => {
    e.preventDefault();
    setDragOver(true);
};

export const handleDragLeave = (setDragOver) => {
    setDragOver(false);
};

export const handleDrop = (e, setDragOver, setFormData, formData) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    setFormData({
        ...formData,
        file,
    });
};
