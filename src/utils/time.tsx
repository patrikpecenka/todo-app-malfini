export interface FormattedTime {
  formattedTime: string;
}

export const getFormattedTime = (): FormattedTime => {
  const currentTime = new Date();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return {
    formattedTime: currentTime.toLocaleString('en-UK', options),
  };
};