export default (search) => {
  return search
    .slice(1)
    .split('&')
    .reduce((acc, param) => {
      const [key, value] = param.split('=');
      acc[key] = value;
      return acc;
    }, {});
};
