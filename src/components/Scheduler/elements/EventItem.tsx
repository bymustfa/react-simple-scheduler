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
}

const EventItem: FC<IEventItemProps> = ({
  id,
  title,
  date,
  startTime,
  endTime,
  render,
  topPercent,
}) => {
  return (
    <div
      className="event-item"
      style={{
        top: topPercent + "%",
      }}
    >
      {render ? render({ id, title, date, startTime, endTime }) : title}
    </div>
  );
};

export default EventItem;
