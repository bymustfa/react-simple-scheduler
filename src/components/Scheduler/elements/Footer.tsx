import React, { FC } from "react";
import { DaysType } from "../types/Days.types";

interface IFooterProps {
  days: DaysType[];
}

const Footer: FC<IFooterProps> = ({ days }) => {
  return (
    <div className="s-footer">
      <div className="time-foot">Times</div>
      {days.map((day, index) => (
        <div
          key={index}
          className={"date-foot " + (day.isToday ? " today " : "")}
        >
          <span className="day-name">{day.shortName}</span>
          <span className="date-name">{day.dateText}</span>
        </div>
      ))}
    </div>
  );
};

export default Footer;
