import React, { FC, useContext, useEffect, useState } from "react";
import ConfigContext from "../context/ConfigContext";
import Days from "../helpers/days";
import type { DaysType } from "../types/Days.types";

import { Calander, ChevronLeft, ChevronRight } from "../icons";

interface ITopBarProps {
  setDays: (days: DaysType[]) => void;
}

const TopBar: FC<ITopBarProps> = ({ setDays }) => {
  const { weekStartDay, lang, disableDays, days } = useContext(ConfigContext);

  const [startText, setStartText] = useState<string>("");
  const [endText, setEndText] = useState<string>("");
  const [yearText, setYearText] = useState<number>();

  useEffect(() => {
    if (days.length > 0) {
      const fistDay = days[0];
      const endDay = days[days.length - 1];

      // first day format MMMM DD
      const firstDayFormat = new Date(fistDay.date).toLocaleDateString(lang, {
        month: "long",
        day: "numeric",
      });

      // end day format MMMM DD
      const endDayFormat = new Date(endDay.date).toLocaleDateString(lang, {
        month: "long",
        day: "numeric",
      });

      setStartText(firstDayFormat);
      setEndText(endDayFormat);
      setYearText(new Date(fistDay.date).getFullYear());
    }
  }, [days, lang]);

  const setNextWeek = () => {
    const newDays = Days.getNextWeekDays(days, lang, disableDays);
    setDays(newDays);
  };

  const setPrevWeek = () => {
    const newDays = Days.getPrevWeekDays(days, lang, disableDays);
    setDays(newDays);
  };

  const setToday = () => {
    const newDays = Days.getDays(weekStartDay, lang, disableDays);
    setDays(newDays);
  };

  return (
    <div className="s-top-bar">
      <div className="week-navigation">
        <div className="year-text">{yearText}</div>

        <div className="navigation-buttons">
          <button className="btn btn-prev-week" onClick={setPrevWeek}>
            <ChevronLeft />
          </button>
          <div>
            {startText} - {endText}
          </div>
          <button className="btn btn-next-week" onClick={setNextWeek}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="other-buttons">
        <button className="btn btn-today" onClick={setToday}>
          <Calander />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
