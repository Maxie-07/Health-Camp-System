export const formatDate = (value: string | Date): string => {
  const date = typeof value === 'string' ? new Date(value) : value;
  return date.toLocaleString();
};
