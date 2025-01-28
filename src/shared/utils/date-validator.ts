import { isValid, parse } from 'date-fns';

export const isValidDate = (
  dateString: string | null | undefined,
  format: string = 'yyyy-MM-dd',
): boolean => {
  if (
    dateString === null ||
    dateString === undefined ||
    dateString.trim() === ''
  ) {
    return false;
  }

  const parsedDate = parse(dateString, format, new Date());

  return isValid(parsedDate);
};
