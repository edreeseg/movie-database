// Code to initalize ES6 Map for ratings and genres.

export const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
export const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Fantasy',
  'Horror',
  'Musical',
  'Romance',
];
export const initialRatingsChecked = new Map(
  ratings.map(rating => [rating, true])
);
export const initialGenresChecked = new Map(genres.map(genre => [genre, true]));
