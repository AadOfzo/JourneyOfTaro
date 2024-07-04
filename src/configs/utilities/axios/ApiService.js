import api from "./api";

const ApiService = {

    // Images
    async uploadImage(formData) {
        return await api.post('/fileUpload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    async fetchImages() {
        return await api.get('/images');
    },

    async deleteImage(id) {
        return await api.delete(`/images/${id}`);
    },

    async getImageFromUser(userId) {
        try {
            const response = await api.get(`/users/${userId}/image`, {
                responseType: 'arraybuffer' // Ensure response is treated as binary data
            });
            if (response.status === 200) {
                const imageData = Buffer.from(response.data, 'binary').toString('base64');
                const mimeType = response.headers['content-type'];
                return { imageData, mimeType };
            }
            throw new Error(`Failed to fetch image for user ${userId}. Status: ${response.status}`);
        } catch (error) {
            console.error(`Error fetching image for user ${userId}:`, error);
            throw error; // Rethrow the error to be handled by the caller (e.g., UserList component)
        }
    },

    // Songs
    async fetchSongs() {
        return await api.get('/songs');
    },

    async uploadSong(formData) {
        return await api.post('/fileUpload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    async addSong(id) {
        return await api.post(`/songs/${id}`);
    },

    async deleteSong(id) {
        return await api.delete(`/songs/${id}`);
    },

    // Song Collections
    async fetchSongCollections() {
        return await api.get('/songCollections');
    },

    async addSongToCollection(songId, collectionId) {
        return await api.post(`/songCollections/${collectionId}/songs`, [songId]);
    },

};

export default ApiService;
