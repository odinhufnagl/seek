import moment from 'moment';
import { uses24HourClock } from 'react-native-localize';
import { translate } from '../i18n';
export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// TODO: should be able to return different types
export const getTime = (date: Date) => {
  return moment(date).format(uses24HourClock() ? 'HH:mm' : 'h:mm A');
};

// TODO: show time if today, make it optional
export const formatRelativeDate = (
  date: Date | string,
  showOnlyTimeToday = false,
  showTime = false,
) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const translateKey = 'relativeDate.';
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const today = new Date();

  if (isSameDate(today, date)) {
    if (showOnlyTimeToday) {
      return getTime(date);
    }
    return translate(translateKey + 'today') + `${showTime ? `, ${getTime(date)}` : ''}`;
  }
  if (isSameDate(yesterday, date)) {
    return translate(translateKey + 'yesterday') + `${showTime ? `, ${getTime(date)}` : ''}`;
  } else {
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();

    if (year === currentYear) {
      // Format as 'month day' (e.g., 'July 13')
      return `${date.toLocaleString(undefined, {
        month: 'long',
        day: 'numeric',
      })}${showTime ? `, ${getTime(date)}` : ''}`;
    } else {
      // Format as 'month day, year' (e.g., 'July 13, 2022')
      return `${date.toLocaleString(undefined, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}${showTime ? `, ${getTime(date)}` : ''}`;
    }
  }
};
