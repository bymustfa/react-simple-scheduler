import React, { createContext, useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import type { DaysIndex, Langs } from "../types/Scheduler.types";
import { TimeSlotInterval } from "../types/Scheduler.types";

interface IConfigContext {
  weekStartDay?: DaysIndex;
  lang?: Langs;
  disableDays?: DaysIndex[];
  timeSlotInterval?: TimeSlotInterval;
}

const defaultState: IConfigContext = {
  weekStartDay: 0,
  lang: "en",
  disableDays: [],
};

const ConfigContext = createContext<Partial<IConfigContext>>(defaultState);

export default ConfigContext;
