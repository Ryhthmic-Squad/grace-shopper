import React from 'react';
import {
  ProductCardForCart,
  Column,
  X,
  Input,
} from '../../components/styles/ProductCardForCart';

const ProductCard = ({ product }) => {
  const totalPriceOfItem = product.cartProducts.quantity * product.price;
  return (
    <>
      <ProductCardForCart>
        <Column>
          <h3>{product.name}</h3>
          <img src={product.imageUrl} width="250rem" overflow="hidden" />
        </Column>
        <Column>
          <p>{product.cartProducts.quantity}</p>
          <span>
            <button>+</button>
            <button>-</button>
          </span>
        </Column>
        <p>${product.price}</p>
        <Column>
          <h2>${totalPriceOfItem}</h2>
          <X id="delete-item">X</X>
          <p>Remove</p>
        </Column>
      </ProductCardForCart>
      <hr />
    </>
  );
};

export default ProductCard;
