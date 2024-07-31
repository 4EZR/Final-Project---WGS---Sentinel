import axios from 'axios';


const apiKey = 'AIzaSyDClQf-0mxjZfC8V0l9aCduiZdSNeSnBWQ'; // Replace with your Unsplash API access key
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export const searchYoutube = async (query) => {
    try {
        const response = await axios.get(API_URL, {
            params: {
                part: 'snippet',
                q: query,
                key: apiKey,
                type: 'video',
                maxResults: 5
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};