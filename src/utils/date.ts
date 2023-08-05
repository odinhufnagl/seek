import { translate } from '../i18n';

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// TODO: show time if today, make it optional
export const formatRelativeDate = (date: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  const translateKey = 'relativeDate.';
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const today = new Date();

  if (isSameDate(today, date)) {
    return translate(translateKey + 'today');
  }
  if (isSameDate(yesterday, date)) {
    return translate(translateKey + 'yesterday');
  } else {
    const currentYear = new Date().getFullYear();
    const year = date.getFullYear();

    if (year === currentYear) {
      // Format as 'month day' (e.g., 'July 13')
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
      });
    } else {
      // Format as 'month day, year' (e.g., 'July 13, 2022')
      return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  }
};
