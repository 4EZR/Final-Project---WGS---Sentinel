//https://api.unsplash.com/search/photos?query=minima

// src/services/unsplashService.js
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = '6j7jPXoOtxvSxCdj-LIGbHlAdOVHGZn_ocIvaXDjtCs'; // Replace with your Unsplash API access key
const API_URL = 'https://api.unsplash.com';

export const searchPhotos = async (query, page = 1, perPage = 10) => {
    try {
        const response = await axios.get(`${API_URL}/search/photos`, {
            params: {
                query,
                page,
                per_page: perPage,
                client_id: UNSPLASH_ACCESS_KEY,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

