import React, { FC, useState, useEffect, useContext, useRef } from "react";
import type { CellClickEvent } from "../types/Scheduler.types";
import ConfigContext from "../context/ConfigContext";

import EventItem from "./EventItem";

interface IBodyProps {
  showNowLine: boolean;
  cellClick?: (cell: CellClickEvent) => void;
}

const Body: FC<IBodyProps> = ({ showNowLine = true, cellClick }) => {
  const { timeSlotInterval, events, days, times } = useContext(ConfigContext);

  const [nowLine, setNowLine] = useState<boolean>(showNowLine);

  const [time, setTime] = useState<string>(
    new Date().getHours() + ":" + new Date().getMinutes()
  );
  const nowLineRef = useRef<HTMLDivElement>(null);
  const timesColumnRef = useRef<HTMLDivElement>(null);
  const [areaHeightPX, setAreaHeightPX] = useState<number>(0);

  const calculateNowLinePosition = () => {
    if (times.length > 0) {
      const fistTimeString = times[0].startTime;
      const lastTimeString = times[times.length - 1].endTime;
      const nowTimeString = time;

      const today = new Date();

      const fistTime = new Date(
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          fistTimeString
      );
      const lastTime = new Date(
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          lastTimeString
      );
      const nowTime = new Date(
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          nowTimeString
      );
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
      const today = new Date();
      const endTime = new Date(
        today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate() +
          " " +
          times[times.length - 1].endTime
      );
      if (today.getTime() > endTime.getTime()) {
        setNowLine(false);
      } else {
        setNowLine(true);
        setTime(new Date().getHours() + ":" + new Date().getMinutes());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [timeSlotInterval, times]);

  useEffect(() => {
    calculateNowLinePosition();
  }, [timeSlotInterval, time, areaHeightPX, times]);

  useEffect(() => {
    if (timesColumnRef.current) {
      setAreaHeightPX(timesColumnRef.current.offsetHeight);
    }
  }, [timesColumnRef.current, times, timeSlotInterval]);

  console.log(areaHeightPX);

  return (
    <div className="s-body">
      {nowLine && (
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

      {days.map((day, index) => {
        const dayDate = new Date(day.date);
        const todayEvents = events.filter((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === dayDate.getDate() &&
            eventDate.getMonth() === dayDate.getMonth() &&
            eventDate.getFullYear() === dayDate.getFullYear()
          );
        });

        return (
          <div
            key={index}
            className="day-column column "
            style={{ height: areaHeightPX }}
          >
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

            {timeSlotInterval &&
              todayEvents.map((event, eventIndex) => {
                const { startTime, endTime, date } = event;
                const eventDate = new Date(date);
                const eventStartTime = new Date(
                  eventDate.getFullYear() +
                    "/" +
                    eventDate.getMonth() +
                    "/" +
                    eventDate.getDate() +
                    " " +
                    startTime
                );

                const eventEndTime = new Date(
                  eventDate.getFullYear() +
                    "/" +
                    eventDate.getMonth() +
                    "/" +
                    eventDate.getDate() +
                    " " +
                    endTime
                );

                const dayDate = new Date(day.date);
                const dayStartTime = new Date(
                  dayDate.getFullYear() +
                    "/" +
                    dayDate.getMonth() +
                    "/" +
                    dayDate.getDate() +
                    " " +
                    times[0].startTime
                );

                const dayEndTime = new Date(
                  dayDate.getFullYear() +
                    "/" +
                    dayDate.getMonth() +
                    "/" +
                    dayDate.getDate() +
                    " " +
                    times[times.length - 1].endTime
                );

                const topPercent =
                  ((eventStartTime.getTime() - dayStartTime.getTime()) /
                    (dayEndTime.getTime() - dayStartTime.getTime())) *
                  100;

                const eventHeight = Math.abs(
                  ((eventEndTime.getTime() - eventStartTime.getTime()) /
                    (dayEndTime.getTime() - dayStartTime.getTime())) *
                    100
                );
                console.log(eventHeight);

                return (
                  <EventItem
                    key={eventIndex}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    endTime={event.endTime}
                    startTime={event.startTime}
                    topPercent={topPercent}
                    heightPercent={eventHeight}
                  />
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Body;
