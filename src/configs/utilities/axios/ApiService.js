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
    // Users endpoint api calls
    async authenticate(username, password) {
        try {
            const response = await api.post('/authenticate', { username, password });
            return response.data; // Assuming your backend returns a token
        } catch (error) {
            throw error;
        }
    },

    async createUser(formData) {
        try {
            const response = await api.post('/users', formData);
            return response.data; // Assuming backend returns the created user object
        } catch (error) {
            throw error;
        }
    },

    async fetchUserDetails() {
        try {
            const response = await api.get('/user/details');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async grantAdminPrivilege(username) {
        try {
            const response = await api.put(`/users/${username}/grant-admin`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async updateArtistName(userId, artistName) {
        try {
            const response = await api.put(`/users/${userId}/artistName`, null, {
                params: { artistName }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async deleteUser(username) {
        try {
            const response = await api.delete(`/users/${username}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Images endpoint api calls
    async uploadImage(formData) {
        return await api.post('/fileUpload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    fetchImages: async () => {
        return api.get('/images');
    },

    async deleteImage(id) {
        return await api.delete(`/images/${id}`);
    },

    async addImageToUser(userId, file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userName', 'yourUserName'); // Adjust based on your controller
        try {
            const response = await api.post(`/fileUpload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async getImageFromUser(userId) {
        try {
            const response = await api.get(`/users/${userId}/image`, {
                responseType: 'arraybuffer'
            });
            console.log(response);
            if (response.status === 200) {
                const imageData = Buffer.from(response.data, 'binary').toString('base64');
                const mimeType = response.headers['content-type'];
                return { imageData, mimeType };
            }
            throw new Error(`Failed to fetch image for user ${userId}. Status: ${response.status}`);
        } catch (error) {
            console.error(`Error fetching image for user ${userId}:`, error);
            throw error;
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
