import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.error('Token is missing');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

const ApiService = {
    getToken: () => localStorage.getItem('token'),

    async authenticate(username, password) {
        try {
            const response = await api.post('/authenticate', { username, password });
            const { jwt, user } = response.data;
            if (jwt) {
                localStorage.setItem('token', response.data.jwt);
            }
            console.log(response.data)
            return { jwt, user };
        } catch (error) {
            console.error('Error authenticating', error);
            throw new Error(`Error authenticating: ${error.message}`);
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

    async fetchUserDetails(token, username) {
        console.log(token, username);
        try {
            const response = await api.get(`/users/username/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error);
            throw error;
        }
    },

    async grantAdminPrivilege(username) {
        try {
            const response = await api.put(`/users/${username}/grant-admin`);
            return response.data; // or simply return the response if you don't need data
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
    async fetchImages() {
        try {
            const response = await api.get('/images');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching images:', error);
            throw new Error('Failed to fetch images.');
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

    async deleteImage(userId) {
        if (!userId) {
            throw new Error('Image ID is required');
        }

        try {
            return await api.delete(`/images/${userId}`);
        } catch (error) {
            console.error('Error deleting image:', error.response || error.message || error);
            throw error;
        }
    },

    getUserImage: async (userId) => {
        const token = ApiService.getToken();
        if (!token) {
            console.error('Token is missing');
            throw new Error('Token is missing');
        }

        const response = await axios.get(`http://localhost:8080/users/${userId}/image`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
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
            console.log("Upload response:", response.data);
            return response.data;
        } catch (error) {
            console.error('Error uploading song:', error);
            throw error;
        }
    },

    async addSong(songId) {
        try {
            await api.post(`/songs/${songId}`);
        } catch (error) {
            console.error('Error adding song:', error);
            throw error;
        }
    },

    async deleteSong(songId) {
        try {
            await api.delete(`/songs/${songId}`);
        } catch (error) {
            console.error('Error deleting song:', error);
            throw error;
        }
    },

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
        return await api.post(`/songCollections/${collectionId}/songs`, [songId]);
    },
};

export default ApiService;
