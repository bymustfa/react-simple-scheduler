import { TimesType } from "../types/Times.types";

const getTimes = (
  startTime: string,
  endTime: string,
  interval: number
): TimesType[] => {
  const times = [];

  const start = new Date();
  const end = new Date();

  const [startHour, startMinute] = startTime.split(":");
  const [endHour, endMinute] = endTime.split(":");

  start.setHours(parseInt(startHour), parseInt(startMinute));
  end.setHours(parseInt(endHour), parseInt(endMinute));
  while (start < end) {
    times.push({
      startTime: start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: new Date(start.getTime() + interval * 60000).toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      ),
    });
    start.setMinutes(start.getMinutes() + interval);
  }
  return times;
};

const functions = { getTimes };

export default functions;
