export const capitalize = (str: string) => {
  if (str.length > 0) {
    return `${str[0].toLocaleUpperCase().concat(str.slice(1))}`;
  }

  return str;
};
