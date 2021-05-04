export default ({ productPagination, productFilters }) => {
  let query = [];
  for (const paramKey in productPagination) {
    if (paramKey !== 'maxPage') {
      query.push(`${paramKey}=${productPagination[paramKey]}`); //ex. page=1
    }
  }
  for (const paramKey in productFilters) {
    query.push(`${paramKey}=${productFilters[paramKey]}`);
  }
  query = `?${query.join('&')}`;
  return query;
};
