import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type GetMovie = {
  movieId: String;
  cinemaId: String;
  data?: String;
  time?: String;
};
export type Cinema = {
  _id?: String;
  name: String;
  area: String;
  category: String;
  intesity: Number;
};
export type Movie = {
  _id?: String;
  name: String;
  producer: String;
  year: String;
  operator: String;
  actors: String;
  genre: String;
  production: String;
  duration: String;
  image: String;
  bio: String;
};

export const mainApi = createApi({
  reducerPath: "mainApi",
  tagTypes: ["Movies", "Sessions", "Tikets", "Cinemas"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://merncinemaappbackend.onrender.com/",
  }),
  endpoints: (builder) => ({
    getCinemaByArea: builder.query<any, string>({
      query: (currentArea) => {
        return {
          url: `getCinemasByArea/${currentArea}`,
        };
      },
      providesTags: ["Cinemas"],
    }),
    getMovieByCinema: builder.query<any, GetMovie>({
      query: ({ movieId, cinemaId }) => {
        return {
          url: `getMovie/${movieId}/${cinemaId}`,
        };
      },
    }),

    getMoviesByCinema: builder.query<any, string>({
      query: (cinemaId) => {
        return {
          url: `getMoviesByCinema/${cinemaId}`,
        };
      },
      providesTags: ["Movies"],
    }),
    getSessionsByMovieID: builder.query<any, string>({
      query: (movieId) => {
        return {
          url: `getSessions/${movieId}`,
        };
      },
      providesTags: ["Sessions"],
    }),
    getSessionsByCinema: builder.query<any, GetMovie>({
      query: ({ movieId, cinemaId }) => {
        return {
          url: `getSessionsByCinema/${movieId}/${cinemaId}`,
        };
      },
      providesTags: ["Sessions"],
    }),
    getAllMovies: builder.query<any, void>({
      query: () => {
        return {
          url: `getAllMovies`,
        };
      },
      providesTags: ["Movies"],
    }),
    getAllMoviesExceptOne: builder.query<any, string>({
      query: (movieId) => {
        return {
          url: `getAllMoviesExcept/${movieId}`,
        };
      },
      providesTags: ["Movies"],
    }),
    addMovie: builder.mutation<any, Movie>({
      query: (movieObj) => {
        return {
          url: "addMovies",
          method: "POST",
          body: movieObj,
        };
      },
      invalidatesTags: ["Movies"],
    }),
    addMovieToCinema: builder.mutation<any, GetMovie>({
      query: ({ cinemaId, movieId }) => {
        return {
          url: `addMovieToCinema/${cinemaId}/${movieId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Movies"],
    }),
    addSession: builder.mutation<any, any>({
      query: ({ cinemaId, movieId, data, time, good, lux }) => {
        return {
          url: `addSession/${cinemaId}/${movieId}`,
          method: "POST",
          body: { data, time, good, lux },
        };
      },
      invalidatesTags: ["Sessions"],
    }),
    addCinema: builder.mutation<any, Cinema>({
      query: (obj) => {
        return {
          url: `addCinema`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["Cinemas"],
    }),
    getSessionItem: builder.query<any, string>({
      query: (id) => {
        return {
          url: `getSessionItem/${id}`,
        };
      },
      providesTags: ["Tikets"],
    }),
    updateSession: builder.mutation<any, any>({
      query: ({ sessionId, obj }) => {
        return {
          url: `/updateTickets/${sessionId}`,
          method: "POST",
          body: obj,
        };
      },
      invalidatesTags: ["Tikets"],
    }),
    deleteMovieFromCinema: builder.mutation<any, any>({
      query: ({ cinemaId, movieId }) => {
        return {
          url: `/deleteMovieFromCinema/${cinemaId}/${movieId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Movies"],
    }),
  }),
});

export const {
  useGetCinemaByAreaQuery,
  useGetMovieByCinemaQuery,
  useGetSessionsByMovieIDQuery,
  useLazyGetSessionsByMovieIDQuery,
  useAddMovieMutation,
  useGetAllMoviesQuery,
  useAddMovieToCinemaMutation,
  useGetMoviesByCinemaQuery,
  useAddSessionMutation,
  useGetSessionItemQuery,
  useUpdateSessionMutation,
  useGetAllMoviesExceptOneQuery,
  useDeleteMovieFromCinemaMutation,
  useAddCinemaMutation,
  useGetSessionsByCinemaQuery,
} = mainApi;
