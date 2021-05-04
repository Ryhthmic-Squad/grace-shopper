## Store Structure

```javascript
store = {
  productDetail: {},
  productFilters: {
    type: '',
    style: '',
    room: '',
  },
  productList: [],
  productPagination: {
    maxPage: 1,
    page: 1,
    size: 6,
    sort: [['name','DESC']],
  },
  productReviews: [],
  reviewPagination: {
    maxPage: 0,
    page: 1,
    size: 6,
    sort: [['rating', 'DESC']],
  },
}
```
