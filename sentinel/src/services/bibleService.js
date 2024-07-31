//https://bible-api.com/?random=verse


import axios from 'axios';

const API_URL = 'https://labs.bible.org/api/?passage=random&type=json';

export const fetchRandomVerse = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw error;
    }
};
