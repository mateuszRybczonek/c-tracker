function calculateDaysLeft(date) {
  const result = Math.ceil((new Date(date) - (new Date())) / ( 1000 * 3600 * 24));
  if (result <= 0) {
    return 'Expired';
  } else {
    return result;
  }
}

function calculateDaysBetweenDates(finishDate, startDate) {
  return Math.floor(new Date(finishDate) - new Date(startDate)) / (1000 * 3600 * 24);
}

function createFutureDate(numberOfDaysToAdd) {
  let date = new Date();
  return new Date(date.setDate(date.getDate() + numberOfDaysToAdd));
}

export { calculateDaysLeft, calculateDaysBetweenDates, createFutureDate };
