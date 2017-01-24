function calculateDaysLeft(date) {
  return Math.ceil((new Date(date) - (new Date()))/1000/3600/24);
}

export { calculateDaysLeft };
