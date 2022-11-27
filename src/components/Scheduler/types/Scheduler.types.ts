import type { DaysType } from "./Days.types";
import type { TimesType } from "./Times.types";
import type { ReactNode } from "react";

interface ExtraType {
  [key: string]: null | string | number | boolean;
}

export interface Event {
  id: string | number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  render?: (event: Event) => ReactNode;
  extra?: ExtraType;
}

export type DaysIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Langs =
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "tr";

export interface CellClickEvent {
  day: DaysType;
  time: TimesType;
}

export type TimeSlotInterval = 5 | 10 | 15 | 20 | 30 | 40 | 45 | 60;

export interface ISchedulerProps {
  timeSlotStartTime: string;
  timeSlotEndTime: string;
  timeSlotInterval?: TimeSlotInterval;
  weekStartDay?: DaysIndex;
  disableDays?: DaysIndex[];
  lang?: Langs;
  hasFooter?: boolean;
  nowLine?: boolean;
  cellClick?: (cell: CellClickEvent) => void;
  eventClick?: (event: Event) => void;
  events?: Event[];
}
