import React, { FC, useEffect } from "react";
import ConfigContext from "./context/ConfigContext";

import type { ISchedulerProps } from "./types/Scheduler.types";
import "./styles/Scheduler.css";

import Days from "./helpers/days";
import Times from "./helpers/times";

import type { DaysType } from "./types/Days.types";
import type { TimesType } from "./types/Times.types";

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
  events,
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
    <ConfigContext.Provider
      value={{
        weekStartDay,
        lang,
        disableDays,
        timeSlotInterval,
        events,
        days,
        times,
      }}
    >
      <div className="scheduler">
        <TopBar setDays={setDays} />
        <Header />
        <Body showNowLine={nowLine} cellClick={cellClick} />
        {hasFooter && <Footer />}
      </div>
    </ConfigContext.Provider>
  );
};

export default Scheduler;
