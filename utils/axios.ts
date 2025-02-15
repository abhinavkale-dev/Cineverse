import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzYwZDc1M2QyMzFmNmIxMzFjN2YyNGRjMDYwYTI0ZCIsIm5iZiI6MTczNzIxNjMzMi4wOTMsInN1YiI6IjY3OGJkMTRjYTkzY2U0OGJjYTQzMGYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vyueoA2J8aCppRlqjk1ScEw6IGwsVnT4JOioA2yI44o'
      }
});

export default instance;
