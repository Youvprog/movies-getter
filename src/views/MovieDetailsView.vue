<script setup>
import { ref } from 'vue';
import { onBeforeMount, watchEffect } from 'vue';
import { useMovieStore } from '../stores/movieStore';
import Modal from '../components/Modal.vue';
import { useDownload } from '../composables/download';


const props = defineProps(['slug'])
const store = useMovieStore()
let open = ref(false)
const movie_id = history.state.id


onBeforeMount(() => {
    watchEffect(() => {
        store.getMovie(movie_id)
    })
})

</script>



<template>
    <div class="wrapper" v-if="store.movie">
        <div class="movie-summary">
            <div class="movie-image">
                <img class="movie-poster" :src="store.movie.medium_cover_image" alt="Movie image"> 
                <v-btn
                    block
                    color="success"
                    append-icon="mdi-download"
                    @click="open = !open"
                >
                    Download
                </v-btn>
            </div>
            <div class="movie-info">
                <h1>{{store.movie.title}}</h1>
                <div class="year-category">
                    <div class="genres">
                        <div class="genre" v-for="(genre, index) in store.movie.genres">
                            <h3 v-if="index === store.movie.genres.length - 1">{{genre}}</h3>
                            <h3 v-else>{{genre}} /</h3>
                        </div>
                    </div>
                    <h3>{{store.movie.year}}</h3>
                </div>
                <div class="quality">
                    <em>Qualities: </em>
                    <div class="qlt">
                        <v-chip variant="outlined" class="tag" v-for="qlt in store.movie.torrents">{{qlt.quality}}</v-chip>
                    </div>  
                </div>
                <div class="rating">
                    <div class="movie-rating">
                        <v-icon icon="mdi-clock-outline"></v-icon>
                        <span>{{ store.movie.runtime }}m</span>
                    </div>
                    <div class="movie-rating">
                        <v-icon icon="mdi-thumb-up"></v-icon>
                        <span>{{store.movie.like_count}}</span>
                    </div>
                    <div class="movie-rating">
                        <v-icon icon="mdi-star"></v-icon>
                        <span>{{store.movie.rating}}/10</span>
                    </div>
                </div>
                <div class="keywords">
                    <em>Keywords: </em>
                    <div class="kw">
                        <v-chip variant="outlined" class="tag">keywords</v-chip>
                        <v-chip variant="outlined" class="tag">keywords</v-chip>
                        <v-chip variant="outlined" class="tag">keywords</v-chip>
                    </div>
                </div>
            </div>
            <div class="suggested-movies">
                <h2>Similar Movies</h2>
                <div class="movies">
                    <div class="movie" v-for="movie in store.movies">
                        <RouterLink :to="{ name: 'movie-details', params: { slug: movie.slug }, state: { id: movie.id } }">
                            <img class="image" :src="movie.medium_cover_image" alt="suggested image">
                        </RouterLink>
                    </div>
                </div>
            </div>
           
        </div>
        
        <div class="movie-screens">
            <div class="screen">
                <img :src="store.movie.medium_screenshot_image1" alt="">
            </div>
            <div class="screen">
                <img :src="store.movie.medium_screenshot_image2" alt="">
            </div>
            <div class="screen">
                <img :src="store.movie.medium_screenshot_image3" alt="">
            </div>
        </div>
        
        <div class="movie-plot">
            <div class="plot-description">
                <h3>Plot description</h3>
                <div class="plot">
                    <p>{{store.movie.description_full}}</p>
                </div>
            </div>
            <div class="movie-staff" v-if="store.movie.cast">
                <div class="all-cast">
                    <h4>Top cast</h4>
                    <div class="casts" v-for="cast in store.movie.cast">
                        <div class="cast-info">
                            <v-avatar :image="cast.url_small_image" size="45"></v-avatar>
                            <div class="cast-name">
                                {{cast.name}} as {{cast.character_name}}
                            </div>
                        </div>
                        <v-divider></v-divider>
                    </div>
                </div>
            </div>
        </div>
         
        <Modal :open="open" @close-modal="open = !open" width="50%">
            <template v-slot:modal-header>
                <h2>Choose Quality to Download</h2>
            </template>
            <template v-slot:modal-body>
                <div class="downloads">
                    <div class="movie-download" v-for="torrent in store.movie.torrents">
                        <h3>{{ torrent.quality }}</h3>
                        <span>File Size</span>
                        <span>{{ torrent.size }}</span>
                        <v-btn
                            color="success"
                            append-icon="mdi-download"
                            @click="useDownload(torrent.url, store.movie.title, torrent.quality)"
                        >
                            Download
                        </v-btn>
                    </div>
                </div>
            </template>
            <template v-slot:modal-footer>
                <v-btn @click="open = !open">Close</v-btn>
            </template>
        </Modal>
    </div>
    <div v-else>
            content Loading ...
    </div>
</template>


<style scoped>
.movie-download{
    display: flex;
    align-items: center;
    flex-direction: column;
    gap:2rem;
    margin-top: 1rem;
}
.downloads{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    place-items: center;
    gap: 1rem;
    color: #000;
}

.wrapper {
    padding: 3rem 10rem 0 10rem;
}
.movie-summary {
    display: flex;
    justify-content: space-between;
    gap: 8rem;
}
.movie-poster {
    border: 5px #fff solid ;
}
.year-category {
    margin: 1.5rem 0 1.5rem 0;
}
.genres {
    display: flex;
    gap: 0.3rem;
}
.quality {
    margin: 0 0 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.qlt {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.rating {
    margin: 0 0 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.movie-rating {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.keywords {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.movie-screens {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 10px;
    margin-top: 2rem;
}
.screen img {
    width: 100%;
    height: 100%;
}
.movie-plot {
    display: flex;
    justify-content: space-between;
    margin: 3rem 0 3rem 0;
    gap: 3rem;
}
.plot {
    margin: 2rem 0 2rem 0;
}
.all-cast {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.casts {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.cast-info {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cast-name {
    font-size:15px;
    white-space: nowrap;
    word-break: keep-all;
}
.movies {
    display: grid;
    grid-template-columns:  1fr 1fr;
    gap: 0.5rem;
}
.image {
    border: 2px #fff solid;
    height: 138px;
}
</style>