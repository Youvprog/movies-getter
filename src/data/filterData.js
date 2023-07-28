export const filters = [
  {
    title: 'Quality',
    items: ['720p', '1080p', '2160p', '3D'],
    model: 'quality',
  },
  {
    title: 'Genre',
    items: [
      'Action',
      'Adventure',
      'Animation',
      'Comedy',
      'Drama',
      'Fantasy',
      'Horror',
      'Sci-Fi',
    ],
    model: 'genre',
  },
  {
    title: 'Rating',
    items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    model: 'minimum_rating',
  },
  {
    title: 'Order by',
    items: [
      'title',
      'year',
      'rating',
      'peers',
      'seeds',
      'download_count',
      'ike_count',
      'date_added',
    ],
    model: 'sort_by',
  },
];
