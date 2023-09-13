// Import SQLite package
import {createSlice} from '@reduxjs/toolkit';
import {DeleteRow, InsertTable, ReadTable, createTable} from './searchApi';

// Open database

const initialState = {
  data: [],
  keyword: '',
};
// Create table

// Insert data

// Read data

// Update data

// Delete data

const searchSlice = createSlice({
  name: 'search/searchSlice',
  initialState: initialState,
  reducers: {
    Insert: (state, action) => {
      InsertTable({name: action.payload});
    },
    Delete: (state, action) => {
      DeleteRow({id: action.payload});
    },
    Read: (state, action) => {
      var result = ReadTable();
      //    console.log(result);
      state.data = result;
    },
  },
});
export const searchReducer = searchSlice.reducer;

export const dataSearch = state => state.search.data;

export const {Insert, Delete, Read} = searchSlice.actions;
