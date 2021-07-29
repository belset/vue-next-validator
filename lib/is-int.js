export const isInt = (val) => val != "" && !isNaN(val) && Math.round(val) == val;
