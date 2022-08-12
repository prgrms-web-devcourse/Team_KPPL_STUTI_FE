export const getQueryString = (
  key: string,
  type: 'string' | 'number',
): string | number => {
  const { search } = location;
  const qs = new URLSearchParams(search);
  const value = qs.get(key);

  if (type === 'string') {
    return value !== null ? value.replace(/'/g, '') : '';
  } else return Number(value);
};
