import React from 'react';
import { connect } from 'react-redux';
import {
  ProductCardForCart,
  Column,
} from '../../components/styles/ProductCardForCart';
import DeleteButton from '../../components/styles/DeleteButton';
import IncrementButton from '../../components/styles/IncrementButton';
import { updateCartProduct } from '../../store/cart/cart';

const ProductCard = ({ product, updateCartProduct }) => {
  const totalPriceOfItem = product.cartProducts.quantity * product.price;
  return (
    <>
      <ProductCardForCart>
        <Column>
          <h3>{product.name}</h3>
          <img src={product.imageUrl} width="250rem" overflow="hidden" />
        </Column>
        <Column>
          <div>
            <IncrementButton
              onClick={() => {
                updateCartProduct({
                  productId: product.id,
                  quantity: product.cartProducts.quantity + 1,
                });
              }}
            >
              +
            </IncrementButton>
            <p>{product.cartProducts.quantity}</p>
            <IncrementButton
              onClick={() => {
                updateCartProduct({
                  productId: product.id,
                  quantity: product.cartProducts.quantity - 1,
                });
              }}
            >
              -
            </IncrementButton>
          </div>
        </Column>
        <p>${product.price}</p>
        <Column>
          <h2>${totalPriceOfItem}</h2>
          <DeleteButton
            onClick={() =>
              updateCartProduct({
                productId: product.id,
                quantity: 0,
              })
            }
          >
            X
          </DeleteButton>
        </Column>
      </ProductCardForCart>
      <hr />
    </>
  );
};

const mapStateToProps = (state, otherProps) => {
  return {
    product: state.cart.products.find(
      (product) => product.id === otherProps.productId
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartProduct: ({ productId, quantity }) =>
      dispatch(updateCartProduct({ productId, quantity })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
