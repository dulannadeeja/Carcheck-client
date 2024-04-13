import { numberOfPreviousOwnersOptions } from "../features/listing/listing";

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

  // if there are hours and minutes left return the time left or if the auction has ended return 'Auction ended'
  if (hoursLeft > 0 || minutesLeft > 0) {
    return `${hoursLeft}h ${minutesLeft}m left (${formattedDate})`;
  }else{
    return 'Ended';
  }
  
}

// format strings by limiting the number of characters
function limitString(str: string, limit: number): string {
  if (str.length > limit) {
      return `${str.slice(0, limit)}...`;
  }
  return str;
}


// format engine capacity by adding cc
function formatEngineCapacity(capacity: number): string {
  return `${capacity}cc`;
}

// Mapping the number of previous owners to the corresponding string
export function mapOwners(value: number): string {
  const mappedValue = numberOfPreviousOwnersOptions.find((option) => option.value === value);
  return mappedValue?.name || "";
}

export { formatCurrency, formatMileage, formatFeedbackPercentage,formatTimeLeft,limitString , formatEngineCapacity};