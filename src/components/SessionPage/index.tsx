import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";

import {
  useGetMovieByCinemaQuery,
  useGetSessionItemQuery,
  useUpdateSessionMutation,
} from "../../redux/slices/MainApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { SlLocationPin } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import format from "date-fns/format";
import parse from "date-fns/parse";
import uk from "date-fns/locale/uk";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineDisabledByDefault } from "react-icons/md";

import {
  Ticket,
  changeCurrentTiketsArray,
  clearCurrentTicketsArray,
  removeCurrentTiketsArray,
} from "../../redux/slices/Main";
const SessionPage = () => {
  const dispach = useDispatch();

  const currentTiketsArray = useSelector(
    (state: RootState) => state.main.currenTiketsArray
  );
  const { id, movieid } = useParams();
  const currentCinema: any = useSelector(
    (state: RootState) => state.main.currentCinema
  );
  const {
    data: data,
    error,
    isLoading,
  } = useGetMovieByCinemaQuery({
    movieId: movieid as string,
    cinemaId: currentCinema._id,
  });
  const { data: data2, refetch } = useGetSessionItemQuery(id as string);
  const handleTicket = (cur: Ticket, e: React.MouseEvent<HTMLDivElement>) => {
    dispach(changeCurrentTiketsArray(cur));
  };
  const [updateSession, updateSessionResualts] = useUpdateSessionMutation();
  const handleUpdateSession = () => {
    updateSession({
      sessionId: id,
      obj: currentTiketsArray.map((c) => c._id),
    });
    dispach(clearCurrentTicketsArray());
    refetch();
  };

  return (
    data &&
    data2 && (
      <div className="sessionBody">
        <div className="tickets">
          <div className="tiketsStats">
            <p className="tiketsName">Квитки</p>
            <p>
              {currentTiketsArray.length} квитків,{" "}
              {currentTiketsArray.reduce(
                (a: number, b: Ticket) => b.cost + a,
                0
              )}{" "}
              грн
            </p>
          </div>
          <div className="tiketsBody">
            {currentTiketsArray &&
              currentTiketsArray.map((c) => {
                return (
                  <div className="tiket" key={c._id}>
                    <p>{c.row} ряд</p>
                    <p>{c.place} місце</p>
                    <div>
                      {" "}
                      <p>{c.cost} грн</p>
                      <CiCircleRemove
                        fontSize={30}
                        onClick={() => dispach(removeCurrentTiketsArray(c))}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
          <Button
            variant="success"
            className="ticketBtn"
            onClick={() => handleUpdateSession()}
          >
            Забронювати квитки
          </Button>{" "}
        </div>
        <div className="sessionsInfo">
          <div
            className="sessionsInfoImg"
            style={{
              backgroundImage: `url(${data.image})`,
            }}
          ></div>
          <div className="sessionsInfoContent">
            <div className="sessionsInfoContentName">{data.name}</div>
            <div className="sessionsInfoContentBody">
              <div className="sessionsInfoContentBodyHall">
                <div className="sessionsInfoContentBodyHallIcon">
                  <SlLocationPin fontSize={20} />
                </div>
                <div className="sessionsInfoContentBodyHallInfo">
                  <div className="sessionsInfoContentBodyHallInfoHeader">
                    Зал №
                  </div>
                  <div className="sessionsInfoContentBodyHallInfoName">
                    Одесса, {currentCinema.name}
                  </div>
                </div>
              </div>
              <div className="sessionsInfoContentBodyHall">
                <div className="sessionsInfoContentBodyHallIcon">
                  <BsCalendar2Date fontSize={20} />
                </div>
                <div className="sessionsInfoContentBodyHallInfo">
                  <div className="sessionsInfoContentBodyHallInfoHeader">
                    {data2.data}
                  </div>
                  <div className="sessionsInfoContentBodyHallInfoName">
                    {format(parse(data2.data, "P", new Date()), "EEEE", {
                      locale: uk,
                    })}
                  </div>
                </div>
              </div>
              <div className="sessionsInfoContentBodyHall">
                <div className="sessionsInfoContentBodyHallIcon">
                  <BiTime fontSize={20} />
                </div>
                <div className="sessionsInfoContentBodyHallInfo">
                  <div className="sessionsInfoContentBodyHallInfoHeader">
                    Час
                  </div>
                  <div className="sessionsInfoContentBodyHallInfoName">
                    {data2.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sessionHall">
          <div className="sessionHallTop">
            <div className="sessionHallPrices">
              <div className="sessionHallPricesBody">
                <div className="sessionHallPriceIcon"></div>
                <div>
                  <div>GOOD</div>
                  <div>{data2.good} - грн.</div>
                </div>
              </div>
              <div className="sessionHallPricesBody">
                <div className="sessionHallPriceIconRed"></div>
                <div>
                  <div>LUX</div>
                  <div>{data2.lux} - грн.</div>
                </div>
              </div>
            </div>
            <div>
              <svg
                width={500}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 806 21"
                fill="white"
              >
                <path d="M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z"></path>
              </svg>
            </div>
            <div>Екран</div>
          </div>
          <div className="sessionHallBody">
            <div className="sessionHallBodyGood">
              {data2 &&
                data2.places.map((cur: any, index: number) => {
                  return cur.row <= 6 ? (
                    <div
                      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                        handleTicket(cur, e)
                      }
                      key={index}
                      className={`Good ${
                        currentTiketsArray.some((v) => v._id === cur._id)
                          ? `selected`
                          : ``
                      } ${cur.isFree == false ? `disabled` : ``}`}
                      data-seat-row={cur.row}
                      data-place={cur.place}
                    >
                      {cur.isFree == false && <MdOutlineDisabledByDefault />}
                      <span className="tooltiptext">
                        {cur.row} Ряд, {cur.place} Місце <br></br>
                        Ціна: {data2.good} грн.
                      </span>
                    </div>
                  ) : (
                    <div
                      onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                        handleTicket(cur, e)
                      }
                      key={index}
                      className={`Lux ${
                        currentTiketsArray.some((v) => v._id === cur._id)
                          ? `selected-lux`
                          : ``
                      } ${cur.isFree == false ? `disabled` : ``}`}
                      data-seat-row={cur.row}
                      data-place={cur.place}
                    >
                      {cur.isFree == false && <MdOutlineDisabledByDefault />}
                      <span className="tooltiptext">
                        {cur.row} Ряд, {cur.place} Місце <br></br>
                        Ціна: {data2.lux} грн.
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="sessionHallBodyLux"></div>
        </div>
      </div>
    )
  );
};

export default SessionPage;
