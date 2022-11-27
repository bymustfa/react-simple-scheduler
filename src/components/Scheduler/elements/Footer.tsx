import React, { FC, useContext } from "react";
import ConfigContext from "../context/ConfigContext";

interface IFooterProps {}

const Footer: FC<IFooterProps> = () => {
  const { days } = useContext(ConfigContext);

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
