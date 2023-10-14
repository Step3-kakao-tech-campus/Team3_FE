function formatStringToDateByDash(dateString: string): Date | null {
  if (typeof dateString !== "string") return null;

  const dateParts = dateString.split("-");
  if (dateParts.length !== 3) return null;

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) return null;
  return date;
}

export default formatStringToDateByDash;
