function roundToTwo(num: number): number {
  return +(Math.round(Number(num + "e+2")) + "e-2");
}

const timeToSeconds = (timeFormat: string) => {
  const [hours, minutes, seconds] = timeFormat.split(":").map(Number);
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds;
};

export { roundToTwo, timeToSeconds }