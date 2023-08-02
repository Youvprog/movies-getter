<template>
  <v-sheet
    height="100%"
    width="100%"
    color="transparent"
    @mouseover="index = 1"
    @mouseout="index = 0"
  >
    <RouterLink
      class="link"
      :to="{
        name: 'movie-details',
        params: { slug: movie.slug },
        state: { id: movie.id },
      }"
    >
      <v-sheet
        class="movie-image-container"
        height="100%"
        width="100%"
        border="lg opacity-12"
        rounded="lg"
      >
        <div v-show="index === 1" class="infos">
          <v-icon icon="mdi-star"></v-icon>
          <h3>{{ movie.rating }}/10</h3>
          <v-btn class="text-none" color="primary">Details</v-btn>
        </div>
        <v-img
          class="movie-image"
          :src="movie.medium_cover_image"
          lazy-src="https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png"
          height="100%"
          width="100%"
          cover
        ></v-img>
      </v-sheet>
    </RouterLink>
    <div class="movie-info">
      <h4 class="movie-title size">{{ movie.title }}</h4>
      <h5 class="movie-year size">{{ movie.year }}</h5>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps(['movie']);
let index = ref(0);
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 100%;
}
.movie-image-container {
  position: relative;
}
.infos {
  width: inherit;
  height: inherit;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.movie-image:hover {
  opacity: 0.2;
}
.movie-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 422px) {
  .size {
    font-size: 10px;
  }
}
</style>
