<template>
  <div class="d-flex flex-column">
    <div class="d-flex justify-space-between">
      <v-skeleton-loader width="200" type="text" />
      <v-skeleton-loader width="200" type="text" />
    </div>

    <div class="d-flex justify-center align-center">
      <div class="mr-4" v-for="n in props.limit" :key="n">
        <MovieCardSkeleton />
      </div>
    </div>
  </div>
</template>

<script setup>
import MovieCardSkeleton from '@/components/skeletons/MovieCardSkeleton.vue';

const props = defineProps({
  limit: Number,
});
</script>

<style scoped></style>
