<script setup>
import { ref, onBeforeMount, reactive, onUnmounted, watch } from 'vue';
import { useMovieStore } from '@/stores/movieStore';
import { storeToRefs } from 'pinia';
import { useDisplay } from 'vuetify';
import Movie from '@/components/Movie.vue';
import MovieCardSkeleton from '@/components/skeletons/MovieCardSkeleton.vue';
import Filter from '@/components/Filter.vue';
import { filters } from '../data/filterData';
import MobileFilters from '@/components/MobileFilters.vue';

const props = defineProps({
  openFilters: Boolean,
});
const store = useMovieStore();
const { movies, pageNumber, isLoading, totalMovies } = storeToRefs(store);
const { getMovies } = store;
const { width } = useDisplay();
const limit = 28;
const isMobile = 606;
const page = ref(1);
const values = reactive({
  query_term: '',
  quality: 'All',
  genre: 'All',
  minimum_rating: 'All',
  sort_by: 'All',
});

onBeforeMount(() => {
  getMovies(limit, page.value, {});
});

onUnmounted(() => {
  store.$reset();
});

watch(page, (newPage) => {
  getMovies(limit, newPage, values);
});

const searchByQueryField = () => {
  if (values.query_term === '') {
    return;
  }
  getMovies(limit, page.value, { query_term: values.query_term });
};

const searchByFields = () => {
  const filteredValues = {};
  for (const [key, value] of Object.entries(values)) {
    if (value === 'All' || value === '') {
      continue;
    }
    filteredValues[key] = value;
  }
  if (Object.values(filteredValues).length === 0) {
    return;
  }
  getMovies(limit, page.value, filteredValues);
};

const resetFilterFields = () => {
  values.query_term = '';
  values.quality = 'All';
  values.genre = 'All';
  values.minimum_rating = 'All';
  values.sort_by = 'All';
  page.value = 1;
  getMovies(limit, page.value, values);
};
</script>
<template>
  <div class="wrapper">
    <div class="main-filter">
      <div class="mobile-filters" v-if="props.openFilters">
        <MobileFilters
          :values="values"
          :searchByFields="searchByFields"
          :searchByQueryField="searchByQueryField"
          :resetFilterFields="resetFilterFields"
        />
      </div>
      <div v-if="width > isMobile" class="filter-container">
        <div class="search-bar">
          <v-text-field
            label="Search a movie..."
            append-inner-icon="mdi-magnify"
            @click:append-inner="searchByQueryField"
            single-line
            hide-details
            variant="solo"
            v-model="values.query_term"
            clearable
          >
          </v-text-field>
        </div>
        <div class="filters">
          <Filter
            v-for="(filter, index) in filters"
            :key="index"
            :filterTitle="filter.title"
            :items="filter.items"
            v-model="values[filter.model]"
          />
        </div>
        <div class="filter-btn">
          <v-btn color="primary" variant="flat" @click="searchByFields"
            >Apply
          </v-btn>
          <v-btn color="primary" variant="outlined" @click="resetFilterFields"
            >Reset
          </v-btn>
        </div>
      </div>
    </div>
    <div v-if="isLoading" class="w-100 movies-container">
      <div class="movie-container" v-for="n in limit" :key="n">
        <MovieCardSkeleton />
      </div>
    </div>
    <div v-else class="w-100 movies-container">
      <div class="movie-container" v-for="movie in movies" :key="movie.id">
        <Movie :movie="movie" />
      </div>
    </div>
    <div v-if="totalMovies > limit" class="text-center pagination">
      <v-pagination
        v-model="page"
        :length="pageNumber"
        :total-visible="width <= isMobile ? 1 : 7"
      ></v-pagination>
    </div>
  </div>
</template>

<style scoped>
.main-filter {
  width: 100%;
  display: flex;
  justify-content: center;
}

.filter-container {
  width: 900px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.search-bar {
  padding: 2rem 0 0 0;
}

.filters {
  display: flex;
  justify-content: space-between;
}

.filter-btn {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.movie-container {
  width: 230px;
  height: 350px;
}
.movies-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  place-items: center;
  gap: 4rem;
  padding: 5rem 8rem;
}

.pagination {
  padding: 0 0 2rem 0;
}

@media (max-width: 606px) {
  .movies-container {
    padding: 4rem;
  }
  .movie-container {
    width: 180px;
    height: 250px;
  }
}

@media (max-width: 488px) {
  .movies-container {
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 5rem;
    column-gap: 1rem;
    margin: 0 0 2rem 0;
  }
  .movie-container {
    width: 130px;
    height: 220px;
  }
}
</style>
