import React, { FC, ReactNode } from "react";
import { Event } from "../types/Scheduler.types";

interface IEventItemProps {
  id: string | number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  render?: (event: Event) => ReactNode;
  topPercent: number;
  heightPercent: number;
}

const EventItem: FC<IEventItemProps> = ({
  id,
  title,
  date,
  startTime,
  endTime,
  render,
  topPercent,
  heightPercent,
}) => {
  return (
    <div
      className="event-item"
      style={{
        top: topPercent + "%",
        height: heightPercent + "%",
      }}
    >
      {render ? (
        render({ id, title, date, startTime, endTime })
      ) : (
        <div>
          <div>{title}</div>
          <div>
            {startTime} - {endTime}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventItem;
