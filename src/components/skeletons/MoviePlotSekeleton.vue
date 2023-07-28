<template>
  <div class="my-8">
    <v-skeleton-loader type="heading,sentences" />
    <div class="d-flex flex-column mb-8">
      <v-skeleton-loader
        type="list-item-avatar, divider"
        v-for="n in 4"
        :key="n"
      />
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
