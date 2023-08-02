<template>
  <SearchBar
    v-model="props.values.query_term"
    :search-by-query-field="props.searchByQueryField"
  />
  <div class="mobile-fields">
    <Filter
      v-for="(filter, index) in filters"
      :key="index"
      :filterTitle="filter.title"
      :items="filter.items"
      v-model="props.values[filter.model]"
    />
  </div>
  <div class="filter-btn">
    <v-btn color="primary" variant="flat" @click="props.searchByFields"
      >Apply
    </v-btn>
    <v-btn color="primary" variant="outlined" @click="props.resetFilterFields"
      >Reset
    </v-btn>
  </div>
</template>

<script setup>
import Filter from './Filter.vue';
import SearchBar from './SearchBar.vue';
import { filters } from '@/data/filterData';

const props = defineProps({
  searchByQueryField: Function,
  searchByFields: Function,
  resetFilterFields: Function,
  values: Object,
});
</script>

<style scoped>
.mobile-fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
  gap: 1rem;
}

.filter-btn {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
@media (max-width: 350px) {
  .mobile-fields {
    display: flex;
    flex-direction: column;
  }
}
</style>
