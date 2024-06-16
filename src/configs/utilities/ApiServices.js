import api from "./axios/api";

const ApiServices = {
    // Songs
    async fetchSongs() {
        try {
            const response = await api.get('/songs');
            return response.data;
        } catch (error) {
            console.error('Error fetching songs:', error);
            throw error;
        }
    },

    async uploadSong(formData) {
        try {
            const response = await api.post('/fileUpload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading song:', error);
            throw error;
        }
    },

    async addSong(id) {
        try {
            const response = await api.post(`/songs/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error adding song:', error);
            throw error;
        }
    },

    async deleteSong(id) {
        try {
            await api.delete(`/songs/${id}`);
        } catch (error) {
            console.error('Error deleting song:', error);
            throw error;
        }
    },

    // Song Collections
    async fetchSongCollections() {
        try {
            const response = await api.get('/songCollections');
            return response.data;
        } catch (error) {
            console.error('Error fetching song collections:', error);
            throw error;
        }
    },

    async addSongToCollection(songId, collectionId) {
        try {
            const response = await api.post(`/songCollections/${collectionId}/songs`, [songId]);
            return response.data;
        } catch (error) {
            console.error('Error adding song to collection:', error);
            throw error;
        }
    },

    // Images
    async fetchImages() {
        try {
            const response = await api.get('/images');
            return response.data;
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    },

    async uploadImage(formData) {
        try {
            const response = await api.post('/fileUpload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    async deleteImage(id) {
        try {
            await api.delete(`/images/${id}`);
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    }
};

export default ApiServices;
