import React from 'react';
import { connect } from 'react-redux';
import {
  ProductCardForCart,
  Column,
} from '../../components/styles/ProductCardForCart';

const Productcard = ({ cartProduct }) => {
  const { quantity, product } = cartProduct;
  const { price, name, imageUrl, id } = product;
  const totalPriceOfItem = quantity * price;
  return (
    <>
      <ProductCardForCart>
        <Column>
          <h3>{name}</h3>
          <img src={imageUrl} width="200rem" overflow="hidden" />
        </Column>
        <Column>
          <p>{quantity}</p>
        </Column>
        <p>${price}</p>
        <Column>
          <h2>${totalPriceOfItem}</h2>
        </Column>
        <Button
          onClick={() => {
            window.location = `#/products/${id}`;
          }}
        ></Button>
      </ProductCardForCart>
      <hr />
    </>
  );
};

const mapStateToProps = ({ processOrder }) => ({
  order: processOrder,
});

export default connect(mapStateToProps, null)(Productcard);
