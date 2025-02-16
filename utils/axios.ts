import axios from 'axios';

if (!process.env.TMDB_BEARER_TOKEN) {
    throw new Error('TMDB_BEARER_TOKEN is not defined in environment variables');
}

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
    }
});

export default instance;
