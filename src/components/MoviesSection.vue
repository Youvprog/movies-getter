<template>
  <div class="d-flex flex-column align-center">
    <div
      class="section-header w-100 d-md-flex justify-md-space-between d-flex justify-space-between"
    >
      <div class="d-flex">
        <v-icon>{{ icon }}</v-icon>
        <h3 class="pl-3">
          {{ title }}
        </h3>
      </div>
      <RouterLink to="/movies" class="link">Explore more</RouterLink>
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
// d-md-flex justify-md-center align-md-center d-flex flex-wrap justify-center align-center
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}
.movies-cards-container {
  display: grid;
  grid-template-columns: repeat(6, minmax(180px, 1fr));
  place-items: center;
  column-gap: 2rem;
  margin-bottom: 3rem;
}
.movie-container {
  width: 230px;
  height: 350px;
}

@media (min-width: 960px) and (max-width: 1340px) {
  .movies-cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 2rem;
    row-gap: 3rem;
  }
}
@media (min-width: 600px) and (max-width: 960px) {
  .movies-cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3rem;
  }
}

@media (max-width: 600px) {
  .movies-cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3rem;
  }
  .movie-container {
    width: 180px;
    height: 250px;
  }
}

@media (max-width: 422px) {
  .movies-cards-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 8px;
    row-gap: 2rem;
  }
  .movie-container {
    width: 120px;
    height: 190px;
  }
  .section-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin: 0 0 1rem 0;
  }
}
</style>
