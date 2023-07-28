<template>
  <div class="d-flex justify-space-between w-100 h-100">
    <div class="h-100" style="width: 250px">
      <v-skeleton-loader type="image" height="350" />
    </div>
    <div class="d-flex flex-column h-100 w-25">
      <v-skeleton-loader
        type="heading, sentences, chip, chip, chip, chip, chip"
      />
      <v-skeleton-loader type="text@3" />
      <v-skeleton-loader type="chip, chip, chip, chip, chip" />
    </div>
    <div class="d-flex flex-column">
      <v-skeleton-loader type="heading" />
      <div class="movies">
        <v-skeleton-loader width="100" height="150" type="image" />
        <v-skeleton-loader width="100" height="150" type="image" />
        <v-skeleton-loader width="100" height="150" type="image" />
        <v-skeleton-loader width="100" height="150" type="image" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.movies {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}
</style>
