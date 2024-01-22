export interface FormattedTime {
  formattedTime: string;
}

export const getFormattedTime = (): FormattedTime => {
  const currentTime = new Date();

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const formattedTime = currentTime.toLocaleString('en-UK', timeOptions);
  const formattedDate = currentTime.toLocaleString('en-UK', dateOptions);

  return {
    formattedTime: `${formattedTime}, ${formattedDate}`,
  };
};