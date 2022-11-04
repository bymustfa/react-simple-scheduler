import type { DaysType } from "../types/Days.types";
import { DaysIndex } from "../types/Scheduler.types";

const getDays = (
  weekStartDay: number = 0,
  lang: string = "en",
  disableDays: DaysIndex[] = []
): DaysType[] => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date();

    day.setDate(day.getDate() + i - day.getDay() + weekStartDay);

    days.push(day);
  }

  return days.map((day) => ({
    name: day.toLocaleDateString(lang, { weekday: "long" }),
    shortName: day.toLocaleDateString(lang, { weekday: "short" }),
    date: day,

    // dateText format "01 Jan"
    dateText: day.toLocaleDateString(lang, { day: "2-digit", month: "short" }),

    isToday: day.toDateString() === new Date().toDateString(),
    isDisabled: disableDays.includes(day.getDay() as DaysIndex),
  }));
};

const functions = {
  getDays,
};

export default functions;
