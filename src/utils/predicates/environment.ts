export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};
