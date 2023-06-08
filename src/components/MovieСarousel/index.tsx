import React, { useRef, useState } from "react";
import CarouselItem from "../CarouselItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { useGetMoviesByCinemaQuery } from "../../redux/slices/MainApi";

const MovieCarousel = () => {
  const [margin, setMargin] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  const currentCinema: any = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const { data } = useGetMoviesByCinemaQuery(currentCinema._id);
  const carouselM = (str: string) => {
    if (str == "r") {
      setMargin(margin + 1000);
    } else {
      setMargin(margin - 1000);
    }
  };
  const carouselScroll = (e: any) => {
    if (e.deltaY > 0) {
      if (margin < 3500) {
        setMargin(margin + 500);
      }
    } else if (e.deltaY < 0) {
      if (margin != 0) {
        setMargin(margin - 500);
      }
    }
  };
  return (
    <div
      ref={carousel}
      className="carouselBlock"
      onWheel={carouselScroll}
      style={{ marginLeft: `-${margin}px` }}
    >
      <div
        className="carouselArrowRight"
        onClick={() => carouselM("r")}
        style={margin < 3500 ? { display: "flex" } : { display: "none" }}
      >
        <AiOutlineArrowRight />
      </div>
      <div
        className="carouselArrowLeft"
        onClick={() => carouselM("l")}
        style={margin > 0 ? { display: "flex" } : { display: "none" }}
      >
        <AiOutlineArrowLeft />
      </div>
      {data &&
        data.map((c: any, i: any) => {
          return (
            <CarouselItem
              movieData={c}
              currentCinema={currentCinema}
              key={c._id}
            />
          );
        })}
    </div>
  );
};

export default MovieCarousel;
