import type { DaysType } from "../types/Days.types";
import { DaysIndex, Langs } from "../types/Scheduler.types";

const getDays = (
  weekStartDay: number = 0,
  lang: Langs = "en",
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

    dateText: day.toLocaleDateString(lang, { day: "2-digit", month: "short" }),

    isToday: day.toDateString() === new Date().toDateString(),
    isDisabled: disableDays.includes(day.getDay() as DaysIndex),
  }));
};

const getNextWeekDays = (
  days: DaysType[],
  lang: Langs = "en",
  disableDays: DaysIndex[] = []
): DaysType[] => {
  const nextWeekDays = days.map((day) => {
    const newDay = new Date(day.date);
    newDay.setDate(newDay.getDate() + 7);
    return newDay;
  });

  return getDays().map((day, index) => ({
    ...day,
    date: nextWeekDays[index],
    dateText: nextWeekDays[index].toLocaleDateString(lang, {
      day: "2-digit",
      month: "short",
    }),
    isToday: nextWeekDays[index].toDateString() === new Date().toDateString(),
    isDisabled: disableDays.includes(nextWeekDays[index].getDay() as DaysIndex),
  }));
};

const getPrevWeekDays = (
  days: DaysType[],
  lang: Langs = "en",
  disableDays: DaysIndex[] = []
): DaysType[] => {
  const prevWeekDays = days.map((day) => {
    const newDay = new Date(day.date);
    newDay.setDate(newDay.getDate() - 7);
    return newDay;
  });

  return getDays().map((day, index) => ({
    ...day,
    date: prevWeekDays[index],
    dateText: prevWeekDays[index].toLocaleDateString(lang, {
      day: "2-digit",
      month: "short",
    }),
    isToday: prevWeekDays[index].toDateString() === new Date().toDateString(),
    isDisabled: disableDays.includes(prevWeekDays[index].getDay() as DaysIndex),
  }));
};

const functions = {
  getDays,
  getNextWeekDays,
  getPrevWeekDays,
};

export default functions;
