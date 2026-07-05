import axios from 'axios';
import { rapidApiKey } from '../constants'

const baseUrl = 'https://exercisedb.p.rapidapi.com';

// 1. Core reusable API call wrapper function
const apiCall = async (url, params) => {
    try {
        const options = {
            method: 'GET',
            url,
            params,
            headers: {
                // Secure credential configuration tokens
                'x-rapidapi-key': rapidApiKey,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };

        // FIXED: Using axios.request(options) perfectly matches your options setup!
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('Error fetching data: ', error.message);
        return []; // Graceful fallback array to prevent screen crashes
    }
}

// 2. The endpoint implementation function Nomi uses in the UI screens
export const fetchExercisesByBodypart = async (bodyPart) => {
    let data = await apiCall(`${baseUrl}/exercises/bodyPart/${bodyPart}`, { limit: '10' });
    return data;
}