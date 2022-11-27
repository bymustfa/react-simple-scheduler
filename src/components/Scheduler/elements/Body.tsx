import React, { FC, useState, useEffect, useContext, useRef } from "react";
import type { TimesType } from "../types/Times.types";
import type { DaysType } from "../types/Days.types";
import type { CellClickEvent } from "../types/Scheduler.types";
import ConfigContext from "../context/ConfigContext";

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
  const [time, setTime] = useState<string>(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const { timeSlotInterval } = useContext(ConfigContext);
  const nowLineRef = useRef<HTMLDivElement>(null);
  const timesColumnRef = useRef<HTMLDivElement>(null);

  const calculateNowLinePosition = () => {
    if (timesColumnRef.current && times.length > 0) {
      const areaHeightPX = timesColumnRef.current?.clientHeight;
      const fistTimeString = times[0].startTime;
      const lastTimeString = times[times.length - 1].endTime;
      const nowTimeString = time;

      const fistTime = new Date("01/01/2000 " + fistTimeString);
      const lastTime = new Date("01/01/2000 " + lastTimeString);
      const nowTime = new Date("01/01/2000 " + nowTimeString);
      const timeDiff = nowTime.getTime() - fistTime.getTime();
      const timeDiffPercent =
        (timeDiff / (lastTime.getTime() - fistTime.getTime())) * 100;
      const nowLinePosition = (areaHeightPX * timeDiffPercent) / 100;
      if (nowLineRef.current) {
        nowLineRef.current.style.top = nowLinePosition + "px";
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getHours() + ":" + new Date().getMinutes());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateNowLinePosition();
  }, [timeSlotInterval, time, timesColumnRef.current, times]);

  return (
    <div className="s-body">
      {showNowLine && (
        <div ref={nowLineRef} className="now-line" style={{ top: "100%" }}>
          <span>{time}</span>
        </div>
      )}

      <div className="time-column column" ref={timesColumnRef}>
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
