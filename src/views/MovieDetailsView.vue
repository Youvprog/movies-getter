<script setup>
import { onBeforeMount } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import MovieHeaderSekelton from '@/components/skeletons/MovieHeaderSkeleton.vue';
import MovieScreenSekelont from '@/components/skeletons/MovieScreenSekelont.vue';
import MoviePlotSekeleton from '../components/skeletons/MoviePlotSekeleton.vue';

const props = defineProps(['slug']);
const store = useMovieStore();
const { isLoading, movie, movies } = storeToRefs(store);
const { getSingleMovie, getSuggestedMovies } = store;
const movie_id = history.state.id;
const values = {
  movie_id,
  with_images: true,
  with_cast: true,
};

onBeforeMount(() => {
  getSingleMovie(values);
  getSuggestedMovies(values);
});
</script>

<template>
  <div v-if="movies.length === 0 || isLoading" class="wrapper">
    <MovieHeaderSekelton />
    <MovieScreenSekelont :screens="3" />
    <MoviePlotSekeleton />
  </div>
  <div v-else class="wrapper">
    <div class="movie-summary">
      <div class="movie-image">
        <v-img :src="movie.medium_cover_image" cover></v-img>
      </div>
      <div class="d-flex flex-column justify-space-between">
        <h1>{{ store.movie.title }}</h1>
        <div class="year-category">
          <div class="genres">
            <div
              class="genre"
              v-for="(genre, index) in movie.genres"
              :key="index"
            >
              <h3 v-if="index === movie.genres.length - 1">{{ genre }}</h3>
              <h3 v-else>{{ genre }} /</h3>
            </div>
          </div>
          <h3>{{ movie.year }}</h3>
        </div>
        <div class="d-flex align-center">
          <em class="mr-2">Qualities: </em>
          <div class="d-flex">
            <v-chip
              variant="outlined"
              class="mr-2"
              v-for="qlt in movie.torrents"
            >
              {{ qlt.quality }}
            </v-chip>
          </div>
        </div>
        <div class="rating">
          <div class="movie-rating">
            <v-icon icon="mdi-clock-outline"></v-icon>
            <span>{{ movie.runtime }}m</span>
          </div>
          <div class="movie-rating">
            <v-icon icon="mdi-thumb-up"></v-icon>
            <span>{{ movie.like_count }}</span>
          </div>
          <div class="movie-rating">
            <v-icon icon="mdi-star"></v-icon>
            <span>{{ movie.rating }}/10</span>
          </div>
        </div>
        <div class="d-flex align-center">
          <em class="mr-2">Keywords: </em>
          <div class="d-flex">
            <v-chip
              v-for="genre in movie.genres"
              variant="outlined"
              class="mr-2"
            >
              {{ genre }}
            </v-chip>
          </div>
        </div>
      </div>
      <div class="suggested-movies">
        <h2>Similar Movies</h2>
        <div class="movies">
          <div class="movie" v-for="movie in movies">
            <RouterLink
              :to="{
                name: 'movie-details',
                params: { slug: movie.slug },
                state: { id: movie.id },
              }"
            >
              <v-img :src="movie.medium_cover_image" cover></v-img>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
    <div class="movie-screens">
      <v-img height="250" :src="movie.medium_screenshot_image1" cover></v-img>
      <v-img height="250" :src="movie.medium_screenshot_image2" cover></v-img>
      <v-img height="250" :src="movie.medium_screenshot_image3" cover></v-img>
    </div>
    <div>
      <div v-if="movie.description_full" class="plot-description">
        <h3 class="text-decoration-underline mb-4">Plot description</h3>
        <div>
          <p>{{ movie.description_full }}</p>
        </div>
      </div>

      <div v-if="movie.cast" class="all-cast">
        <h4>Top cast</h4>
        <div class="casts" v-for="cast in movie.cast">
          <div class="cast-info">
            <v-avatar
              color="surface-variant"
              :image="cast.url_small_image"
              size="45"
            ></v-avatar>
            <div class="cast-name">
              {{ cast.name }} as {{ cast.character_name }}
            </div>
          </div>
          <v-divider></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie {
  width: 100px;
  border: 2px #fff solid;
}

.movie-image {
  width: 250px;
  min-height: 100%;
}

.movie-download {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;
}

.downloads {
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
}

.year-category {
  margin: 1.5rem 0 1.5rem 0;
}

.genres {
  display: flex;
  gap: 0.3rem;
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

.movie-screens {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 2rem;
}

.plot-description {
  margin: 2rem 0 2rem 0;
}

.all-cast {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
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
  font-size: 15px;
  white-space: nowrap;
  word-break: keep-all;
}

.movies {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
.skeleton {
  width: 350px;
}
</style>
