import api from "./api";

const ApiService = {

    // Users


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
