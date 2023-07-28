import { createRouter, createWebHistory } from 'vue-router';
import HomePageView from '../views/HomePageView.vue';
import MovieDetailsView from '../views/MovieDetailsView.vue';
import MoviesView from '../views/MoviesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePageView,
    },
    {
      path: '/movies',
      name: 'movies',
      component: MoviesView,
    },
    {
      path: '/movies/:slug',
      name: 'movie-details',
      component: MovieDetailsView,
      props: true,
    },
  ],
});

export default router;
