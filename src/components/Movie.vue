<template>
  <RouterLink
    :to="{
      name: 'movie-details',
      params: { slug: movie.slug },
      state: { id: movie.id },
    }"
    class="link"
  >
    <div class="card" @mouseover="index = 1" @mouseout="index = 0">
      <div class="card2">
        <div v-show="index === 1" class="btn">
          <v-icon icon="mdi-star"></v-icon>
          <h3>{{ movie.rating }}/10</h3>
          <v-btn class="text-none" color="primary">Details</v-btn>
        </div>
        <img
          ref="image"
          :src="movie.medium_cover_image"
          @error="replaceMovieImage"
          class="movie-picture"
        />
      </div>
    </div>
    <div class="movie-info">
      <h4 class="movie-title">{{ movie.title }}</h4>
      <h5 class="movie-year">{{ movie.year }}</h5>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps(['movie']);
const image = ref(null);
const onErrorImage =
  'https://cdn.vuetifyjs.com/docs/images/graphics/img-placeholder.png';
let index = ref(0);

const replaceMovieImage = () => {
  image.value.src = onErrorImage;
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: inherit;
}

.movie-picture {
  object-fit: cover;
  border-radius: 20px;
  width: 230px;
  height: 345px;
}

.movie-picture:hover {
  opacity: 0.2;
}

.movie-info {
  width: 230px;
}

.movie-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  width: 230px;
  height: 345px;
  background-image: linear-gradient(163deg, #00ff75 0%, #3700ff 100%);
  border-radius: 20px;
  transition: all 0.3s;
  position: relative;
}

.card2 {
  width: 230px;
  height: 345px;
  background-color: #1a1a1a;
  border-radius: 20px;
  transition: all 0.2s;
}

.card2:hover {
  transform: scale(0.98);
  border-radius: 20px;
}

.card:hover {
  box-shadow: 0px 0px 30px 1px rgba(0, 255, 117, 0.3);
}

.btn {
  width: inherit;
  height: inherit;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
</style>
