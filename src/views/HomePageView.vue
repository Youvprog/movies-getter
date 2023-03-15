<template>
    <div class="wrapper">
        <v-parallax src="popcorn.jpg">
            <div class="header">
                <h1>Any movie you want, WE GOT IT!</h1>
                <div class="popular-movies">
                    <div class="movies-header">
                        <h3> <V-icon icon="mdi-star"></V-icon>Most popular downloads</h3>
                        <RouterLink to="/movies" class="link">Explore more</RouterLink>
                    </div>
                    <div class="most-download">
                        <div class="movie-container" v-for="movie in pplMovies" :key="movie.id">
                            <Movie :movie="movie"/>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="header-box">
                        <h3>Brows movies by categories</h3>
                        <div class="categories">
                            
                        </div>
                    </div>
                </div>
            </div>
        </v-parallax>
        <div class="latest">
            <div class="movies-header">
                <h3><v-icon icon="mdi-movie-star"></v-icon> Latest Uploads</h3>
                <RouterLink to="/movies" class="link">Explore more</RouterLink>
            </div>
            <div class="latest-movies">
                <div class="movie-container" v-for="movie in latestMovies">
                    <Movie :movie="movie"/>
                </div>
            </div>
        </div>
        <div class="rated">
            <div class="movies-header">
                <h3> <v-icon icon="mdi-thumb-up"></v-icon> Most rated movies</h3>
                <RouterLink to="/movies" class="link">Explore more</RouterLink>
            </div>
            <div class="most-rated">
                <div class="movie-container" v-for="movie in max_rating">
                    <Movie :movie="movie"/>
                </div>  
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useMovieStore } from '../stores/movieStore';
import Movie from '../components/Movie.vue';
import api from '../services/api'


const store = useMovieStore()
const max_rating = ref(null)
const pplMovies = ref(null)
const latestMovies = ref(null)


onBeforeMount(async () => {
    store.isLoading = true
    latestMovies.value =  await api.fetchData('date_added', 10)
    pplMovies.value =  await api.fetchData('download_count')
    max_rating.value =  await api.fetchData('', 5, 9)
    store.isLoading = false
})

</script>

<style scoped>
.categories {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
}
.header-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 500px;
}
.header {
    padding: 5rem 10rem 0 10rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.popular-movies {
    display: flex;
    flex-direction: column;
    padding: 5rem 0 0 0;
}
.most-download {
    display: flex;
    gap: 1rem;
    padding: 1rem 0 0 0;
}
.latest {
    padding: 5rem 10rem 0 10rem;
}
.latest-movies {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    padding: 1rem 0 0 0;
}
.rated {
    padding: 5rem 10rem 0 10rem;
}
.most-rated {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    padding: 1rem 0 2rem 0;
}
.movies-header {
    display: flex;
    justify-content: space-between;
}
.link {
    text-decoration: none;
    color: inherit;
}
</style>