import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import {
  useGetMovieByCinemaQuery,
  useGetMoviesByCinemaQuery,
} from "../../redux/slices/MainApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Sessions } from "../../components";

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const currentCinema: any = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const { data, error, isLoading } = useGetMovieByCinemaQuery({
    movieId: id as string,
    cinemaId: currentCinema._id,
  });
  const { data: data3 } = useGetMoviesByCinemaQuery(currentCinema._id);
  return !data ? (
    <div>Loading</div>
  ) : (
    <div className="moviePage">
      <div className="moviePageImg">
        {" "}
        <div
          className="moviePageImg"
          style={{
            backgroundImage: `url(${data.image})`,
          }}
        >
          {" "}
        </div>
        <div className="moviePageBtn">
          <Button variant="outline-secondary" size="lg">
            Дивитись трейлер
          </Button>
        </div>
      </div>
      <div className="moviePageInfo">
        <p className="moviePageInfoName">{data.name}</p>
        <div className="moviePageInfoContent">
          <div className="moviePageInfoContentLeft">
            {data.year > 0 && <p>Рік:</p>}
            {data.producer.length > 0 && <p>Режисер:</p>}
            {data.genre.length > 0 && <p>Жанр:</p>}
            {data.duration.length > 0 && <p>Тривалість:</p>}
            {data.production.length > 0 && <p>Виробництво:</p>}
            {data.actors.length > 0 && <p>У головних ролях:</p>}
          </div>
          <div className="moviePageInfoContentRight">
            <p>{data.year}</p>
            <p>{data.producer}</p>
            <p>{data.genre}</p>
            <p>{data.duration}</p>
            <p>{data.production}</p>
            <p>{data.actors}</p>
          </div>
        </div>
        <p className="moviePageInfoDesc">{data.bio}</p>
        <div className="watchAlso">
          <p className="watchAlsoHeader">Дивіться також:</p>
          <div className="watchAlsoContainer">
            {data3 &&
              data3
                .filter((cur: any) => cur._id !== id)
                .map((c: any, index: number) => {
                  return (
                    <Link to={`/movie/${c._id}`} key={index}>
                      <div className="watchAlsoItem">
                        <div
                          className="watchAlsoItemImg"
                          style={{
                            backgroundImage: `url(${c.image})`,
                          }}
                        ></div>
                        <p className="watchAlsoItemName">{c.name}</p>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
      <div className="moviePageSession">
        <Sessions id={id as string} movieData={data} />
      </div>
    </div>
  );
};

export default MoviePage;
