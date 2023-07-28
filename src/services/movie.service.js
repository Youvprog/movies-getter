const movieService = (api) => {
  const fetchMovies = (limit, page, values) =>
    api
      .get('list_movies.json', {
        params: {
          limit,
          page,
          query_term: values.query_term === '' ? '' : values.query_term,
          quality: values.quality === 'All' ? '' : values.quality,
          genre: values.genre === 'All' ? '' : values.genre,
          minimum_rating:
            values.minimum_rating === 'All' ? '' : values.minimum_rating,
          sort_by: values.sort_by === 'All' ? '' : values.sort_by,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  const fetchSingleMovie = (values) =>
    api
      .get(`movie_details.json`, {
        params: {
          ...values,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  const fetchSuggestedMovies = (values) =>
    api
      .get('https://yts.mx/api/v2/movie_suggestions.json?', {
        params: {
          ...values,
        },
      })
      .catch((error) => {
        console.log(error);
      });
  return {
    fetchMovies,
    fetchSingleMovie,
    fetchSuggestedMovies,
  };
};

export default movieService;
