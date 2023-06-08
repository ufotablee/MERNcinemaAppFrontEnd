import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const SessionItem = ({ data, selectValue, movieData, capture }: any) => {
  return data &&
    data.times.length > 0 &&
    data.times.filter((curr: any) => curr.data == selectValue) != false ? (
    <div className="footerSessionsItem">
      <div className="footerSessionsItemName">
        <p>{capture == true ? data.cinema.name : ""}</p>
      </div>
      <div className="footerSessionsTime">
        {data.times
          .filter((curr: any) => curr.data == selectValue)
          .map((c: any, index: number) => {
            return (
              <Link to={`/movie/${movieData._id}/session/${c._id}`} key={index}>
                <div>
                  <p>{c.time}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  ) : null;
};

export default SessionItem;
