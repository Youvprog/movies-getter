import { defineStore } from 'pinia';
import apiCalls from '@/services/api';

export const useMovieStore = defineStore('movieStore', {
  state: () => ({
    movies: [],
    latestMovies: [],
    popularMovies: [],
    highestRatedMovies: [],
    movie: {},
    totalMovies: 0,
    isLoading: false,
    error: null,
    searchedMovies: [],
    searchLoading: false,
  }),
  actions: {
    async getMovies(limit, page, values) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiCalls.fetchMovies(limit, page, values);
        if (response.status === 200) {
          this.movies = response.data.data.movies;
          this.totalMovies = response.data.data.movie_count;
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        this.error = error;
      }
    },
    async getSingleMovie(values) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiCalls.fetchSingleMovie(values);
        if (response.status === 200) {
          this.movie = response.data.data.movie;
          this.error = null;
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        this.error = error;
      }
    },
    async getSuggestedMovies(values) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiCalls.fetchSuggestedMovies(values);
        if (response.status === 200) {
          this.movies = response.data.data.movies;
          this.isLoading = false;
          this.error = null;
        }
      } catch (error) {
        this.isLoading = false;
        this.error = error;
      }
    },
    async getHomePageMovies(limit, page, values, type) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiCalls.fetchMovies(limit, page, values);
        if (response.status === 200) {
          switch (type) {
            case 'latest':
              this.latestMovies = response.data.data.movies;
              break;
            case 'popular':
              this.popularMovies = response.data.data.movies;
              break;
            case 'highest_rated':
              this.highestRatedMovies = response.data.data.movies;
            default:
              break;
          }
          this.isLoading = false;
          this.error = null;
        } else {
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        this.error = error;
      }
    },
    async queryMoviesByName(limit, page, values) {
      this.searchLoading = true;
      this.error = null;
      try {
        const response = await apiCalls.fetchMovies(limit, page, values);
        if (response.status === 200) {
          this.searchLoading = false;
          this.error = null;
          this.searchedMovies = response.data.data.movies;
        }
      } catch (error) {
        this.searchLoading = false;
        this.error = error;
      }
    },
  },
  getters: {
    pageNumber: (state) => state.totalMovies / 21,
  },
});
