const formatCurrency = (value: number, currency: "LKR" | "$" ) => {
  // add commas to the value
  const modifiedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${currency} ${modifiedValue}`;
};

const formatMileage = (value: number) => {
  // add commas to the value
  const modifiedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${modifiedValue} km`;
}

const formatFeedbackPercentage = (value: number) => {
  return `${value}%`;
}

// Formatting the time left for the auction to end in hours and minutes and the date
function formatTimeLeft(endDate: Date): string {
  // Calculate time difference
  const now = new Date();
  const timeDifference = endDate.getTime() - now.getTime();

  // Calculate hours and minutes
  const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  // Format the date
  const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(endDate);

  // Format the output
  return `${hoursLeft}h ${minutesLeft}m left (${formattedDate})`;
}

// format strings by limiting the number of characters
function limitString(str: string, limit: number): string {
  if (str.length > limit) {
      return `${str.slice(0, limit)}...`;
  }
  return str;
}

export { formatCurrency, formatMileage, formatFeedbackPercentage,formatTimeLeft,limitString};