import { format, compareDesc } from "date-fns";

export const ISOtoDDMMYY = (ISOdate) => {
  const date = new Date(ISOdate);
  return format(date, "dd LLLL yyyy");
};

export const sortByDateDesc = (unsorted) => {
  const sorted = unsorted.slice().sort((a, b) => {
    return compareDesc(new Date(a.postedOn), new Date(b.postedOn));
  });
  return sorted;
};

export const readingTime = (text) => {
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);

  return time;
};
