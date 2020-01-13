import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

const getOriginalList = state => state.originalList;
const getSortBy = state => state.sortBy;
const getOrderIsDescending = state => state.orderIsDescending;
const getCheckedRatings = state => state.checkedRatings;
const getCheckedGenres = state => state.checkedGenres;
const getSearchQuery = state => state.searchQuery;

const inputSelectors = [
  getOriginalList,
  getSortBy,
  getOrderIsDescending,
  getCheckedRatings,
  getCheckedGenres,
  getSearchQuery,
];

export const getDerivedListFromOptions = createSelector(
  inputSelectors,
  (
    originalList,
    sortBy,
    orderIsDescending,
    checkedRatings,
    checkedGenres,
    searchQuery
  ) => {
    const newList = filterList(originalList, checkedRatings, checkedGenres);
    if (searchQuery.length > 1) {
      return getSearchResult(newList, searchQuery);
    }
    return sortList(newList, sortBy, orderIsDescending);
  }
);

function filterList(movies, checkedRatings, checkedGenres) {
  return movies.filter(
    movie => checkedRatings.get(movie.rating) && checkedGenres.get(movie.genre)
  );
}

function getSearchResult(movies, searchQuery) {
  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: ['title', 'main_actors'],
  };
  const fuse = new Fuse(movies, searchOptions);
  return fuse.search(searchQuery);
}

function sortList(movies, sortBy, orderIsDescending) {
  const copy = [...movies];
  return copy.sort((a, b) => {
    switch (sortBy) {
      case 'A-Z':
        if (orderIsDescending) {
          return a.title > b.title ? 1 : -1;
        }
        return b.title > a.title ? 1 : -1;
      case 'Year':
        if (orderIsDescending) {
          return a.year - b.year;
        }
        return b.year - a.year;
      case 'Runtime':
        if (orderIsDescending) {
          return a.run_time - b.run_time;
        }
        return b.run_time - a.run_time;
      case 'Rating':
        const ratingValues = {
          G: 0,
          PG: 1,
          'PG-13': 2,
          R: 3,
          'NC-17': 4,
        };
        if (orderIsDescending) {
          return ratingValues[a.rating] - ratingValues[b.rating];
        }
        return ratingValues[b.rating] - ratingValues[a.rating];
      default:
        return 0;
    }
  });
}
