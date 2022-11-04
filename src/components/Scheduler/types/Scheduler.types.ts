import type { DaysType } from "./Days.types";
import type { TimesType } from "./Times.types";

interface Event {
  id: string | number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  render?: (event: Event) => React.ReactNode;
  extra?: any;
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

export interface ISchedulerProps {
  timeSlotStartTime: string;
  timeSlotEndTime: string;
  timeSlotInterval?: number;
  weekStartDay?: DaysIndex;
  disableDays?: DaysIndex[];
  lang?: Langs;
  hasFooter?: boolean;
  nowLine?: boolean;
  cellClick?: (cell: CellClickEvent) => void;
  eventClick?: (event: Event) => void;
}
