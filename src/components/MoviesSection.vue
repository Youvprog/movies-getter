<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-space-between">
      <div class="d-flex">
        <v-icon>{{ icon }}</v-icon>
        <h3 class="pl-3">
          {{ title }}
        </h3>
      </div>
      <RouterLink to="/movies" class="text-decoration-none"
        >Explore more</RouterLink
      >
    </div>
    <div class="movies-cards-container">
      <div
        class="movie-container"
        v-for="movie in props.movies"
        :key="movie.id"
      >
        <Movie :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Movie from '@/components/Movie.vue';

const props = defineProps({
  movies: Array,
  title: String,
  icon: String,
});
</script>

<style scoped>
.movies-cards-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0 0 0;
}
</style>
