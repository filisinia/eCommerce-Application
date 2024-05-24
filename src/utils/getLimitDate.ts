export const getLimitDate = (limit: number): string => {
  const currentDate = new Date();
  const isoSlice = 10;

  const date = currentDate
    .toISOString()
    .slice(0, isoSlice)
    .split('-')
    .flatMap((el: string, i): string => {
      const dateLimit = 10;
      let newEl: string | number = Number(el);

      if (i === 0) newEl -= limit;

      if (newEl < dateLimit) newEl = `0${newEl}`;

      return `${newEl}`;
    })
    .join('-');

  return date;
};
