<template>
  <div class="wrapper">
    <v-parallax src="popcorn.jpg">
      <div class="hero">
        <h1 class="text-center">Any movie you want, WE GOT IT!</h1>
        <MoviesSectionSkeleton :limit="limit" v-if="isLoading" />
        <MoviesSection
          v-else
          :movies="popularMovies"
          title="Most popular movies"
          icon="mdi-popcorn"
        />
      </div>
    </v-parallax>

    <section class="movies-section-wrapper">
      <MoviesSectionSkeleton :limit="limit" v-if="isLoading" />
      <MoviesSection
        v-else
        :movies="latestMovies"
        title="Latest Uploads"
        icon="mdi-cloud-upload"
      />
    </section>
    <section class="movies-section-wrapper">
      <MoviesSectionSkeleton :limit="limit" v-if="isLoading" />
      <MoviesSection
        v-else
        :movies="highestRatedMovies"
        title="Highest rated movies"
        icon="mdi-star"
      />
    </section>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import MoviesSection from '@/components/MoviesSection.vue';
import MoviesSectionSkeleton from '@/components/skeletons/MoviesSectionSkeleton.vue';

const store = useMovieStore();
const { getHomePageMovies } = store;
const { latestMovies, popularMovies, highestRatedMovies, isLoading } =
  storeToRefs(store);
const limit = 6;
const page = 1;

onBeforeMount(() => {
  getHomePageMovies(limit, page, { sort_by: 'download_count' }, 'popular');
  getHomePageMovies(limit, page, { sort_by: 'date_added' }, 'latest');
  getHomePageMovies(limit, page, { minimum_rating: 9 }, 'highest_rated');
});
</script>

<style scoped>
.hero {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.movies-section-wrapper {
  padding: 2rem;
}
</style>
