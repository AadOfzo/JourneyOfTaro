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
    async authenticate(username, password) {
        try {
            const response = await api.post('/authenticate', { username, password });
            return response.data; // Assuming your backend returns a token
        } catch (error) {
            throw error;
        }
    },

    async fetchUserId() {
        const userId = localStorage.getItem('userId'); // Get userId key from localStorage
        if (!userId) {
            throw new Error('API key not found in localStorage');
        }
        return userId;
    },

    async fetchApiKey() {
        const apiKey = localStorage.getItem('apiKey'); // Get API key from localStorage
        if (!apiKey) {
            throw new Error('API key not found in localStorage');
        }
        return apiKey;
    },

    async fetchUserDetails() {
        try {
            const userId = await this.fetchUserId(); // Fetch API key from user
            const response = await axios.get(`/users/${userId}`, {
                headers: {
                    'Authorization': 'Bearer ' + userId
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

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
