import React, { FC, useState } from "react";
import Select from "react-select";
import "./app.css";

import Scheduler from "./components/Scheduler/Scheduler";
import { DaysIndex, Langs } from "./components/Scheduler/types/Scheduler.types";

const App: FC = () => {
  const [timeSlotStartTime, setTimeSlotStartTime] = useState("09:00");
  const [timeSlotEndTime, setTimeSlotEndTime] = useState("18:00");
  const [timeSlotInterval, setTimeSlotInterval] = useState(30);
  const [weekStartDay, setWeekStartDay] = useState<DaysIndex>(0);
  const [disableDays, setDisableDays] = useState<DaysIndex[]>([0]);
  const [language, setLanguage] = useState<Langs>("en");
  const [hasFooter, setHasFooter] = useState<boolean>(true);
  const [showNowLine, setShowNowLine] = useState<boolean>(true);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];

  const langs = [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ru",
    "zh",
    "ja",
    "ko",
    "tr",
  ];

  return (
    <div className="main">
      <div className="options-form">
        <div className="form-group">
          <label>Time Slots Start</label>

          <Select
            options={times.map((time) => ({ value: time, label: time }))}
            onChange={(e) => setTimeSlotStartTime(e.value)}
            value={{ value: timeSlotStartTime, label: timeSlotStartTime }}
          />
        </div>

        <div className="form-group">
          <label>Time Slots End</label>
          <Select
            options={times.map((time) => ({ value: time, label: time }))}
            onChange={(e) => setTimeSlotEndTime(e.value)}
            value={{ value: timeSlotEndTime, label: timeSlotEndTime }}
          />
        </div>

        <div className="form-group">
          <label>Time Slots Interval (Minute)</label>

          <Select
            options={[15, 30, 45, 60].map((time) => ({
              value: time,
              label: time,
            }))}
            onChange={(e) => setTimeSlotInterval(e.value)}
            value={{ value: timeSlotInterval, label: timeSlotInterval }}
          />
        </div>

        <div className="form-group">
          <label>Week Start Day</label>
          <Select
            defaultValue={{ value: weekStartDay, label: days[weekStartDay] }}
            onChange={(e) => setWeekStartDay(e.value)}
            options={[
              { value: 0, label: days[0] },
              { value: 1, label: days[1] },
              { value: 2, label: days[2] },
              { value: 3, label: days[3] },
              { value: 4, label: days[4] },
              { value: 5, label: days[5] },
              { value: 6, label: days[6] },
            ]}
          />
        </div>

        <div className="form-group">
          <label>Disable Days</label>

          <Select
            defaultValue={disableDays.map((day) => ({
              value: day,
              label: days[day],
            }))}
            onChange={(e) => setDisableDays(e.map((day) => day.value))}
            options={[
              { value: 0, label: days[0] },
              { value: 1, label: days[1] },
              { value: 2, label: days[2] },
              { value: 3, label: days[3] },
              { value: 4, label: days[4] },
              { value: 5, label: days[5] },
              { value: 6, label: days[6] },
            ]}
            isMulti
          />
        </div>

        <div className="form-group">
          <label>Language</label>
          <Select
            defaultValue={{ value: language, label: language }}
            onChange={(e) => setLanguage(e.value)}
            options={[
              { value: "en", label: "en" },
              { value: "es", label: "es" },
              { value: "fr", label: "fr" },
              { value: "de", label: "de" },
              { value: "it", label: "it" },
              { value: "pt", label: "pt" },
              { value: "ru", label: "ru" },
              { value: "zh", label: "zh" },
              { value: "ja", label: "ja" },
              { value: "ko", label: "ko" },
              { value: "tr", label: "tr" },
            ]}
          />
        </div>

        <div className="form-group">
          <label>Footer</label>
          <Select
            defaultValue={{
              value: hasFooter,
              label: hasFooter ? "Show" : "Hide",
            }}
            onChange={(e) => setHasFooter(e.value)}
            options={[
              { value: true, label: "Show" },
              { value: false, label: "Hide" },
            ]}
          />
        </div>

        <div className="form-group">
          <label>Now Line</label>
          <Select
            defaultValue={{
              value: showNowLine,
              label: showNowLine ? "Show" : "Hide",
            }}
            onChange={(e) => setShowNowLine(e.value)}
            options={[
              { value: true, label: "Show" },
              { value: false, label: "Hide" },
            ]}
          />
        </div>
      </div>

      <Scheduler
        timeSlotStartTime={timeSlotStartTime}
        timeSlotEndTime={timeSlotEndTime}
        timeSlotInterval={timeSlotInterval}
        weekStartDay={weekStartDay}
        disableDays={disableDays}
        lang={language}
        hasFooter={hasFooter}
        nowLine={showNowLine}
        cellClick={(cell) => {
          console.log("click cell", cell);
        }}
      />
    </div>
  );
};

export default App;
