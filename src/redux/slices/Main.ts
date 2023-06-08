import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie, useGetAllMoviesQuery } from "./MainApi";

export type CinemaItem = {
  _id: string;
  name: string;
  movies: Movie[];
  area: string;
  category: string;
  intesity: number;
  sessions: object[];
};

export type Ticket = {
  _id: string;
  place: string;
  row: string;
  cost: number;
};
export interface CinemaSliceState {
  cinemas: CinemaItem[];
  currentCinema: CinemaItem;
  currentArea: number;
  currentMoviesByCinema: Movie[];
  movies: Movie[];
  currentSessionsArray: string[];
  currenTiketsArray: Ticket[];
}

const initialState: CinemaSliceState = {
  movies: [],
  cinemas: [],
  currentCinema: {
    _id: "",
    name: "",
    movies: [],
    area: "",
    category: "",
    intesity: 0,
    sessions: [],
  },
  currentArea: 0,
  currentMoviesByCinema: [],
  currentSessionsArray: [],
  currenTiketsArray: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CinemaItem>) => {
      console.log(action.payload);
      state.cinemas.push({ ...action.payload });
    },
    changeCurrentMoviesByCinema: (state, action: PayloadAction<Movie[]>) => {
      state.currentMoviesByCinema = action.payload;
    },
    addMovieToCinema: (state, action: PayloadAction<Movie>) => {
      state.currentMoviesByCinema.push(action.payload);
    },
    addMovies: (state, action: PayloadAction<Movie>) => {
      state.movies.push({ ...action.payload });
    },
    fetchMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
    removeItem: (state, action: PayloadAction<CinemaItem>) => {
      state.cinemas = state.cinemas.filter(
        (obj) => obj._id !== action.payload._id
      );
    },
    changeCurrentArea: (state, action: PayloadAction<number>) => {
      state.currentArea = action.payload;
    },
    changeCurrentCinema: (state, action: PayloadAction<CinemaItem>) => {
      state.currentCinema = action.payload;
    },
    changeCurrentCinemaMovies: (state, action: PayloadAction<Movie>) => {
      state.currentCinema.movies.push(action.payload);
    },
    changeCurrentSessionsArray: (state, action: PayloadAction<string[]>) => {
      state.currentSessionsArray = action.payload;
    },
    changeCurrentTiketsArray: (state, action: PayloadAction<Ticket>) => {
      if (state.currenTiketsArray.find((c) => c._id === action.payload._id)) {
        state.currenTiketsArray = state.currenTiketsArray.filter(
          (v) => v._id !== action.payload._id
        );
      } else {
        state.currenTiketsArray.push(action.payload);
      }
    },
    removeCurrentTiketsArray: (state, action: PayloadAction<Ticket>) => {
      state.currenTiketsArray = state.currenTiketsArray.filter(
        (v) => v._id !== action.payload._id
      );
    },
    clearCurrentTicketsArray: (state) => {
      state.currenTiketsArray = [];
    },
  },
});

export const {
  removeItem,
  clearCurrentTicketsArray,
  addItem,
  changeCurrentArea,
  changeCurrentCinema,
  changeCurrentMoviesByCinema,
  addMovies,
  addMovieToCinema,
  fetchMovies,
  changeCurrentCinemaMovies,
  changeCurrentSessionsArray,
  changeCurrentTiketsArray,
  removeCurrentTiketsArray,
} = mainSlice.actions;

export default mainSlice.reducer;
