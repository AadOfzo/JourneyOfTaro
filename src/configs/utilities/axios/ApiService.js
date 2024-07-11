import api from './api';

const ApiService = {
    // Users
    async getUsers() {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    async getUserImage(userId) {
        try {
            const response = await api.get(`/users/${userId}/image`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching image for user ${userId}:`, error);
            throw error;
        }
    },

    async grantAdminPrivilege(userId) {
        try {
            await api.post(`/users/${userId}/authorities`, { authority: 'ROLE_ADMIN' });
        } catch (error) {
            console.error('Error granting admin privilege:', error);
            throw error;
        }
    },

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
            const response = await api.post('/songs', formData, {
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

    // Image (reusing from ApiServices)
    async fetchImageData(imageUrl) {
        const retryFetch = async (url, retries = 3) => {
            try {
                const response = await api.get(url);
                return response.data;
            } catch (error) {
                if (retries === 0) {
                    console.error('Error fetching data:', error);
                    throw error;
                }
                console.warn(`Retrying... (${3 - retries + 1})`);
                await new Promise(resolve => setTimeout(resolve, 3000));
                return retryFetch(url, retries - 1);
            }
        };

        return retryFetch(imageUrl);
    },

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
            const response = await api.post('/images', formData, {
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
    },

    // Song Collections (reusing from ApiServices)
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
    }
};

export default ApiService;
