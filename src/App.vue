<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, watch } from 'vue';
import { useMovieStore } from './stores/movieStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import useDebouncedToRed from './composables/useDebouncedRef';

const route = useRoute();
const store = useMovieStore();
const theme = ref('dark');
const query = useDebouncedToRed('', 500);
const { searchedMovies } = storeToRefs(store);
const { queryMoviesByName } = store;
const icons = ['mdi-facebook', 'mdi-twitter', 'mdi-instagram'];

function onClick() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
}

watch(query, (newQuery) => {
  if (newQuery === '') return;
  console.log(newQuery);
  queryMoviesByName(5, 1, { query_term: newQuery, minimum_rating: 7 });
});
</script>

<template>
  <v-app :theme="theme">
    <v-app-bar>
      <template v-slot:prepend>
        <RouterLink to="/" class="link">Movies</RouterLink>
      </template>
      <div class="search">
        <v-text-field
          v-model="query"
          :loading="store.searchLoading"
          density="compact"
          variant="solo"
          label="Search a movie..."
          append-inner-icon="mdi-magnify"
          single-line
          hide-details
        >
        </v-text-field>
      </div>
      <RouterLink to="/movies" class="link">
        <v-btn :prepend-icon="'mdi-movie-open-outline'"></v-btn>
      </RouterLink>
      <v-btn
        :prepend-icon="
          theme === 'dark' ? 'mdi-weather-night' : 'mdi-weather-sunny'
        "
        @click="onClick"
      >
      </v-btn>
    </v-app-bar>
    <v-main>
      <div class="searched-movies" v-if="query !== ''">
        <div class="movie" v-for="movie in searchedMovies">
          <RouterLink
            :to="{
              name: 'movie-details',
              params: { slug: movie.slug },
              state: { id: movie.id },
            }"
            class="link movie-found"
          >
            <v-avatar
              :image="movie.small_cover_image"
              rounded="0"
              size="50"
            ></v-avatar>
            <div class="movie-searched-title">
              {{ movie.title }}
            </div>
          </RouterLink>
        </div>
      </div>
      <RouterView :key="route.path" />
    </v-main>
    <v-footer class="text-center d-flex flex-column">
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="text"
        ></v-btn>
      </div>

      <div class="pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
        Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
        accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a
        sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
        lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
        iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
        vel ut orci. Orci varius natoque penatibus et magnis dis parturient
        montes, nascetur ridiculus mus.
      </div>

      <v-divider></v-divider>

      <div class="px-4 py-2 text-center w-100">
        <strong>Youv</strong> © {{ new Date().getFullYear() }} — All right
        reserved.
      </div>
    </v-footer>
  </v-app>
</template>

<style scoped>
.searched-movies {
  z-index: 9999 !important;
  position: fixed;
  background-color: #212121;
  width: 250px !important;
  right: 190px;
  display: flex;
  flex-direction: column;
  color: #fff;
}

.movie-found {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.movie-found:hover {
  background-color: #353434;
}

.movie-searched-title {
  margin-left: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.search {
  width: 20%;
}

.link {
  text-decoration: none;
  color: inherit;
}
</style>
