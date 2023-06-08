import React, { useState, useEffect } from "react";

import MovieCarousel from "../MovieСarousel";
import {
  changeCurrentMoviesByCinema,
  fetchMovies,
} from "../../redux/slices/Main";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllMoviesQuery,
  useGetMoviesByCinemaQuery,
} from "../../redux/slices/MainApi";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const dispach = useDispatch();
  const [skip, setSkip] = useState(true);
  const currentCinema = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const currentMovies = useSelector(
    (state: RootState) => state.main.currentMoviesByCinema
  );
  // const { data } = useGetAllMoviesQuery();

  // useEffect(() => {
  //   dispach(fetchMovies(data));
  // }, [data]);

  return <MovieCarousel />;
};

export default Home;
