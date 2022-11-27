import React, { createContext } from "react";
import type { DaysIndex, Langs } from "../types/Scheduler.types";
import type { TimeSlotInterval, Event } from "../types/Scheduler.types";
import type { DaysType } from "../types/Days.types";
import { TimesType } from "../types/Times.types";

interface IConfigContext {
  weekStartDay?: DaysIndex;
  lang?: Langs;
  disableDays?: DaysIndex[];
  timeSlotInterval?: TimeSlotInterval;
  events?: Event[];
  days?: DaysType[];
  times?: TimesType[];
}

const defaultState: IConfigContext = {
  weekStartDay: 0,
  lang: "en",
  disableDays: [],
  events: [],
  days: [],
  times: [],
};

const ConfigContext = createContext<Partial<IConfigContext>>(defaultState);

export default ConfigContext;
