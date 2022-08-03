export const getTime = (createdAt: string) => {
  const [date, time] = createdAt.split(' ');

  const returnTime = () => {
    if (time) {
      const [hour, minute, second] = time.split(':');

      return {
        hour: parseInt(hour),
        minute: parseInt(minute),
        second: parseInt(second),
      };
    } else {
      return undefined;
    }
  };

  const [year, month, day] = date.split('-');

  return {
    year: parseInt(year),
    month: parseInt(month),
    day: parseInt(day),
    time: returnTime(),
  };
};
