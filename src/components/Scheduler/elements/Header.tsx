import React, { FC } from "react";
import { DaysType } from "../types/Days.types";

interface IHeaderProps {
  days: DaysType[];
}

const Header: FC<IHeaderProps> = ({ days }) => {
  return (
    <div className="s-header">
      <div className="time-head">Times</div>
      {days.map((day, index) => (
        <div
          key={index}
          className={"date-head " + (day.isToday ? " today " : "")}
        >
          <span className="day-name">{day.shortName}</span>
          <span className="date-name">{day.dateText}</span>
        </div>
      ))}
    </div>
  );
};

export default Header;
