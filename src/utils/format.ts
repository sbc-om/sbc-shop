export const formatOMR = (value: number): string => {
  const rounded = Math.round(value * 1000) / 1000;
  return `${rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  })} OMR`;
};
