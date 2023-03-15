import { defineStore, storeToRefs } from 'pinia'
import api from '../services/api'
import { useRouter } from 'vue-router';




export const useMovieStore = defineStore('movieStore', {
    state: () => ({
        isLoading: false,
        movies: null,
        movie: null,
        pageNumber: 0,
        searchLoading: false
    }),
    actions: {
        async getmovies(limit, page, quality , genre , rating , sort) {
            const router = useRouter()
            this.isLoading = true
            await api.fetchMovies(limit, page, quality , genre , rating , sort)
                    .then(rep => {
                        this.movies = rep.data.data.movies
                        this.pageNumber = Math.ceil(rep.data.data.movie_count/rep.data.data.limit)
                        router.push({ query: { page, quality, genre, rating, sort }})
                    })
                    .catch(err => {
                        console.log(err)
                    })
            this.isLoading = false
        },
        async getMovie(id) {
            this.isLoading = true
            await api.fetchMovie(id)
                    .then(rep => {
                        this.movie = rep[0].data.data.movie
                        this.movies = rep[1].data.data.movies
                    })
                    .catch(err => {
                        console.log(err)
                    })
            this.isLoading = false
        },
    },
    getters: {
    }
})