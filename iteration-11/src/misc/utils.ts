export const humanizeSongLength = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const minutesString = String(minutes).padStart(2, '0');
  const hoursString = String(hours).padStart(2, '0');
  const secondsString = String(seconds).padStart(2, '0');
  if (hours === 0) {
    return `${minutesString}:${secondsString}`;
  }

  return `${hoursString}:${minutesString}:${secondsString}`;
};
