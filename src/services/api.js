import axios from 'axios'


const urlMovies = 'https://yts.mx/api/v2/list_movies.json?';

function getSingleMovie(id) {
    return axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_images=true&with_cast=true`)
}
function getSuggestedMovies(id) {
    return axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${id}`)
}


export default { 
    fetchMovies(limit, page, quality , genre , rating , sort) {
        return axios.get(urlMovies, {
            params: {
                limit: limit,
                page: page,
                quality: quality === 'All' ? '': quality,
                genre: genre === 'All' ? '': genre,
                minimum_rating: rating === 'All' ? '': rating,
                sort_by: sort === 'All' ? '': sort
            },
        })
    },
    fetchMovie(id) {
        return Promise.all([getSingleMovie(id), getSuggestedMovies(id)])
    },
    async fetchData(sort='', limit=5, rating=0) {
        try {
            const rep = await fetch(`https://yts.mx/api/v2/list_movies.json?sort_by=${sort}&limit=${limit}&minimum_rating=${rating}`)
            const data = await rep.json()
            return data.data.movies
        } catch (error) {
            console.log(error)
        }
        
    }
}
