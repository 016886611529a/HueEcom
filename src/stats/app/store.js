import {configureStore} from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import {searchReducer} from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    home: homeReducer,
    search: searchReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
