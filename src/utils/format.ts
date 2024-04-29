import { numberOfPreviousOwnersOptions } from "../features/listing/clientListing";

const formatCurrency = (value: number, currency?: "LKR" | "$") => {

  currency = currency || "LKR";

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

// use date-fns to format the time left
// if the time is in past return 'Ended on {date}'
// if the time is in future return '{hours}h {minutes}m left ({date})'
// if the time is less than 1 hour return '{minutes}m left ({date})'
// if the time is greater than 1day return '{days}d {hours}h left ({date})'
function formatTimeLeft(endDate: Date): string {
  const currentDate = new Date();
  const diff = endDate.getTime() - currentDate.getTime();
  const diffInHours = diff / (1000 * 60 * 60);
  const diffInMinutes = diff / (1000 * 60);
  const diffInDays = diffInHours / 24;

  if (diff < 0) {
    return `Ended on ${formatDate(endDate)}`;
  } else if (diffInHours < 1) {
    return `${Math.floor(diffInMinutes)}m left (${formatDate(endDate)})`;
  } else if (diffInDays >= 1) {
    return `${Math.floor(diffInDays)}d ${Math.floor(diffInHours % 24)}h left (${formatDate(endDate)})`;
  }
  return `${Math.floor(diffInHours)}h ${Math.floor(diffInMinutes % 60)}m left (${formatDate(endDate)})`;

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

// format the date and time to a readable format
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export { formatCurrency, formatMileage, formatFeedbackPercentage, formatTimeLeft, limitString, formatEngineCapacity };