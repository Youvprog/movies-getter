<script setup>
import { ref, watchEffect, onBeforeMount, watch } from 'vue'
import  { useMovieStore } from '../stores/movieStore'
import Movie from '../components/Movie.vue';
import MovieSkeleton from '../components/MovieSkeleton.vue';
import Filter from '../components/Filter.vue';



const store = useMovieStore()
const limit = 15
const page = ref(1)
const quality = ref('')
const genre = ref('')
const rating = ref(0)
const sort = ref('')
const query = ref('')




const filters = [
    {
        type: 'Quality',
        items: ['All','720p','1080p','3D'],
    },
    {
        type: 'Genres',
        items: ['All','Action','Adventure','Animation','Comedy','Drama','Fantasy','Horror','Sci-Fi']
    },
    {
       type: 'Rating',
       items: ['All',9,8,7,6,5,4,3,2,1]
    },
    {
        type: 'Sort by',
        items: ['All','Title', 'Year', 'Rating', 'Peers', 'Seeds', 'Download count', 'Like count', 'Date added']
    }
]



async function filterMovies() {
    if(quality.value === '' && genre.value === '' && rating.value === 0 && sort.value === '') return 
    store.getmovies(limit, page.value, quality.value, genre.value, rating.value, sort.value.replace(' ', '_').toLowerCase())

}

watch(page, (newPage) =>{
    store.getmovies(limit, newPage, quality.value, genre.value, rating.value, sort.value.replace(' ', '_').toLowerCase())
}, {deep: true})





onBeforeMount(() => {
    watchEffect(() => {
        if(quality.value !== '' || genre.value !== '' || rating.value !== 0 || sort.value !== '') return
        else store.getmovies(limit, page.value) 
    }) 
})


</script>

<template>
    <div class="wrapper">
        <div class="main-filter">
            <div class="filter-container">
             
                <div class="search-bar">
                    <v-text-field
                        label="Search a movie..."
                        append-inner-icon="mdi-magnify"
                        @click:append-inner="console.log('hello')"
                        single-line
                        hide-details
                        variant="solo"
                    >
                    </v-text-field>
                </div>
                <div class="filters">
                    <div class="filter">
                        <p>{{filters[0].type}}</p>
                        <v-select
                            v-model="quality"
                            :items="filters[0].items"
                            density="compact"
                            single-line
                            variant="solo"
                        ></v-select>
                    </div>
                    <div class="filter">
                        <p>{{filters[1].type}}</p>
                        <v-select
                            v-model="genre"
                            :items="filters[1].items"
                            density="compact"
                            single-line
                            variant="solo"
                        ></v-select>
                    </div>
                    <div class="filter">
                        <p>{{filters[2].type}}</p>
                        <v-select
                            v-model="rating"
                            :items="filters[2].items"
                            density="compact"
                            single-line
                            variant="solo"
                        ></v-select>
                    </div>
                    <div class="filter">
                        <p>Order by</p>
                        <v-select
                            v-model="sort"
                            :items="filters[3].items"
                            density="compact"
                            single-line
                            variant="solo"
                        ></v-select>
                    </div>
                    
                </div>
                <div class="filter-btn">
                    <v-btn 
                        color="primary"
                        variant="outlined"
                        @click="filterMovies"
                        >Apply
                    </v-btn>
                </div>
              
            </div>
        </div>
        <div v-if="store.isLoading" class="movies-container">
            <div class="movie-container" v-for="n in 15" :key="n">
                <MovieSkeleton/>
            </div>
        </div>
        <div v-else class="movies-container">
            <div class="movie-container" v-for="movie in store.movies" :key="movie.id">
                <Movie :movie="movie"/>
            </div>
        </div>
        <div class="text-center pagination">
            <v-pagination
            v-model="page"
            :length="store.pageNumber"
            :total-visible="7"
            ></v-pagination>
        </div>
    </div>
</template>

<style scoped>
.main-filter {
    width: 100%;
    display: flex;
    justify-content: center;
}
.filter-container{
    width: 900px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}
.search-bar {
    padding: 2rem 0 0 0;
}
.filters {
    display: flex;
    justify-content: space-between;
}
.filter {
    width: 150px;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}
.filter-btn {
    display: flex;
    justify-content: center;
}
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.movies-container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 3rem 5rem 3rem 5rem;
}
.pagination {
    padding: 0 0 2rem 0;
}
</style>