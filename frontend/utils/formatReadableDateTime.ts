
export default function formatReadableDateTime(
  date: Date | string,
  option?: Intl.DateTimeFormatOptions
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    // hour12: true,
    ...option,
  };

  const dateTimeFormat = new Intl.DateTimeFormat('en-UK', options);

  return dateTimeFormat.format(new Date(date));
}