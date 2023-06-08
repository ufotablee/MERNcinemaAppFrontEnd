import React from "react";
import { Link } from "react-router-dom";
import { FaInfo, FaPlay } from "react-icons/fa";
import isToday from "date-fns/isToday";
import isTomorrow from "date-fns/isTomorrow";
import Form from "react-bootstrap/Form";
import uk from "date-fns/locale/uk";
import format from "date-fns/format";
import "react-datepicker/dist/react-datepicker.css";
import add from "date-fns/add";
import {
  Cinema,
  Movie,
  useGetSessionsByCinemaQuery,
} from "../../redux/slices/MainApi";
import SessionItem from "../SessionItem";
type props = {
  movieData: Movie;
  currentCinema: Cinema;
};
const CarouselItem: React.FC<props> = ({ movieData, currentCinema }) => {
  const { data } = useGetSessionsByCinemaQuery({
    movieId: movieData._id as string,
    cinemaId: currentCinema._id as string,
  });
  console.log(data);
  const [selectValue, setSelectValue] = React.useState(format(new Date(), "P"));
  const data2 = format(new Date(), "EEE, d MMMM", { locale: uk });

  const isToday2 = isToday(new Date()) ? "Сьогодні" : "";
  const finalData = data2 + " " + isToday2;
  const tomomorrow = add(new Date(), {
    days: 1,
  });
  const tommorrow = format(tomomorrow, "EEE, d MMMM", { locale: uk });
  const isTommorrow2 = isTomorrow(tomomorrow) ? "Завтра" : "";
  const finalTommorrow = tommorrow + " " + isTommorrow2;

  const afterTommorrow2 = add(tomomorrow, {
    days: 1,
  });
  const afterTommorrow = format(afterTommorrow2, "EEE, d MMMM", { locale: uk });

  const selectHandler = (e: any) => {
    setSelectValue(e.target.value);
  };
  return (
    <div className="carouselItem">
      <div
        className="carouselBg"
        style={{
          backgroundImage: `url(${movieData.image})`,
        }}
      ></div>
      <div className="carouselInfo">
        <div className="carouselInfoDetailed">
          <Link
            to={`/movie/${movieData._id}`}
            className="carouselInfoDetailedInfo"
          >
            <div className="carouselInfoDetailedInfoIcon">
              <FaInfo className="carouselInfoDetailedInfoIconSvg" />
            </div>
            <p className="carouselInfoDetailedInfoText">
              Детальніше <br />
              про фільм
            </p>
          </Link>
          <div className="carouselInfoDetailedInfo">
            <div className="carouselInfoDetailedInfoIcon">
              <FaPlay className="carouselInfoDetailedInfoIconSvg" />
            </div>
            <p className="carouselInfoDetailedInfoText">
              Дивитись <br />
              трейлер
            </p>
          </div>
        </div>

        <div className="carouselInfoBody">
          <p className="carouselInfoName">{currentCinema.name}</p>
          <div className="dateSelectDiv">
            {" "}
            <Form.Select
              className="dateSelect"
              aria-label="Default select example"
              onChange={selectHandler}
            >
              <option value={format(new Date(), "P")}>{finalData}</option>
              <option value={format(tomomorrow, "P")}>{finalTommorrow}</option>
              <option value={format(afterTommorrow2, "P")}>
                {afterTommorrow}
              </option>
            </Form.Select>
          </div>

          <p className="carouselInfoSessionsName">Розклад сеансів</p>
          <div className="carouselInfoSessions">
            {data &&
              data.map((c: any, index: number) => {
                return (
                  <SessionItem
                    data={c}
                    capture={false}
                    key={c._id}
                    selectValue={selectValue}
                    movieData={movieData}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="carouselName">{movieData.name}</div>
    </div>
  );
};

export default CarouselItem;
