function calculateDaysLeft(date) {
  const result = Math.ceil((new Date(date) - (new Date()))/1000/3600/24);
  if (result <= 0) {
    return 'Expired';
  }
  return result;
}

function calculateDaysBetweenDates(finishDate, startDate) {
  return Math.floor(new Date(finishDate) - new Date(startDate)) / (1000 * 3600 * 24);
}

export { calculateDaysLeft, calculateDaysBetweenDates };
