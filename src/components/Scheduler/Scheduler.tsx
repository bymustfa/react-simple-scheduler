import React, { FC, useEffect } from "react";
import { ISchedulerProps } from "./types/Scheduler.types";
import "./styles/Scheduler.css";
import Days from "./helpers/days";
import Times from "./helpers/times";
import { DaysType } from "./types/Days.types";
import { TimesType } from "./types/Times.types";

import TopBar from "./elements/TopBar";
import Header from "./elements/Header";
import Body from "./elements/Body";
import Footer from "./elements/Footer";

const Scheduler: FC<ISchedulerProps> = ({
  timeSlotStartTime,
  timeSlotEndTime,
  timeSlotInterval = 30,
  weekStartDay = 0,
  lang = "en",
  disableDays = [],
  nowLine = true,
  hasFooter = false,
  cellClick,
  eventClick,
}) => {
  const [days, setDays] = React.useState<DaysType[]>([]);
  const [times, setTimes] = React.useState<TimesType[]>([]);

  useEffect(() => {
    const days = Days.getDays(weekStartDay, lang, disableDays);
    setDays(days);

    const times = Times.getTimes(
      timeSlotStartTime,
      timeSlotEndTime,
      timeSlotInterval
    );
    setTimes(times);
  }, [
    timeSlotStartTime,
    timeSlotEndTime,
    timeSlotInterval,
    weekStartDay,
    lang,
    disableDays,
  ]);

  return (
    <div className="scheduler">
      <TopBar />
      <Header days={days} />
      <Body
        showNowLine={nowLine}
        days={days}
        times={times}
        cellClick={cellClick}
      />
      {hasFooter && <Footer days={days} />}
    </div>
  );
};

export default Scheduler;
