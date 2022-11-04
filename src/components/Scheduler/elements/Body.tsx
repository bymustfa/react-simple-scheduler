import React, { FC } from "react";
import { TimesType } from "../types/Times.types";
import { DaysType } from "../types/Days.types";
import { CellClickEvent } from "../types/Scheduler.types";

interface IBodyProps {
  times: TimesType[];
  days: DaysType[];
  showNowLine: boolean;
  cellClick?: (cell: CellClickEvent) => void;
}

const Body: FC<IBodyProps> = ({
  times,
  days,
  showNowLine = true,
  cellClick,
}) => {
  return (
    <div className="s-body">
      <div className="time-column column">
        {times.map((time, index) => (
          <div key={index} className="time-item">
            {time.startTime} - {time.endTime}
          </div>
        ))}
      </div>

      {days.map((day, index) => (
        <div key={index} className="day-column column ">
          {times.map((time, timeIndex) => (
            <div
              key={timeIndex}
              className={
                "cell-item " +
                (day.isToday ? " today " : "") +
                (day.isDisabled ? " disabled " : "")
              }
              onClick={() => cellClick && cellClick({ day, time })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Body;
