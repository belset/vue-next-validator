export const isFloat = (val) => val != "" && !isNaN(val) && Math.round(val) != val;
