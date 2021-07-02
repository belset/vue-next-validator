export const isInt = (val) => val != "" && !isNaN(val) && Math.round(val) == val;
export const isFloat = (val) => val != "" && !isNaN(val) && Math.round(val) != val;
export const isCurrency = (val) => /^\d+(?:\.\d{0,2})$/.test(val);
export const isDigit = (val) => /^\d*$/.test(val);
export const isUrl = (val) => /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/.test(val);
export const isEmail = (val) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val);
