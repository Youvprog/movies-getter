<template>
  <div class="movie-screens">
    <div v-for="n in props.screens" :key="n">
      <v-skeleton-loader type="image" height="250" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  screens: Number,
});
</script>

<style scoped>
.movie-screens {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin-top: 2rem;
}
</style>
