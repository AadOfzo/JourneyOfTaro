import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const ApiService = {
    // Authentication endpoint
    async authenticate(username, password) {
        try {
            const response = await api.post('/authenticate', { username, password });
            return response.data;
        } catch (error) {
            throw new Error(`Error authenticating: ${error.message}`);
        }
    },

    async getJwtToken(userid, username, password){
        try {
            const response = await api.post('/authenticate/token', {userid, username, password});
            return response.data;
        } catch (error) {
            throw error
        }
    },

    // Users endpoints
    async fetchUsers() {
        try {
            const response = await api.get('/users');
            return response.data || []; // Handle empty response
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Failed to fetch users.');
        }
    },

    async fetchUserByUsername(username) {
        try {
            const response = await api.get(`/users/username/${username}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user ${username}: ${error.message}`);
        }
    },

    async fetchUserById(userId) {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching user ${userId}: ${error.message}`);
        }
    },

    async grantAdminPrivilege(username) {
        try {
            const response = await api.put(`/users/${username}/grant-admin`);
            return response.data;
        } catch (error) {
            throw new Error(`Error granting admin privilege to ${username}: ${error.message}`);
        }
    },

    async updateUser(userId, userData) {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating user ${userId}: ${error.message}`);
        }
    },

    async createUser(userData) {
        try {
            const response = await api.post('/users', userData);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    },

    async deleteUser(username) {
        try {
            const response = await api.delete(`/users/${username}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting user ${username}: ${error.message}`);
        }
    },


    // Image endpoints
    async getUserImage(userId) {
        try {
            const response = await api.get(`/users/${userId}/images`, { responseType: 'arraybuffer' });
            if (response.status === 200) {
                const imageData = Buffer.from(response.data, 'binary').toString('base64');
                const mimeType = response.headers['content-type'];
                return { imageData, mimeType };
            }
            throw new Error(`Failed to fetch image for user ${userId}. Status: ${response.status}`);
        } catch (error) {
            throw new Error(`Error fetching image for user ${userId}: ${error.message}`);
        }
    },

    async addUserImage(userId, file) {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await api.post(`/users/${userId}/image`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        } catch (error) {
            throw new Error(`Error adding image to user ${userId}: ${error.message}`);
        }
    },

    async deleteUserImage(imageId) {
        try {
            const response = await api.delete(`/images/${imageId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting image ${imageId}: ${error.message}`);
        }
    },

    // Songs endpoint api calls
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

    async fetchSongCollections() {
        return await api.get('/songCollections');
    },

    async addSongToCollection(songId, collectionId) {
        return await api.post(`/songCollections/${collectionId}/songs`, [songId]);
    },
};

export default ApiService;
