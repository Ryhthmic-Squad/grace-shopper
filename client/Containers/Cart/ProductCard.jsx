import React from 'react';
import { connect } from 'react-redux';
import {
  ProductCardForCart,
  Column,
} from '../../components/styles/ProductCardForCart';
import DeleteButton from '../../components/styles/DeleteButton';
import { updateCartProduct } from '../../store/cart/cart';

const ProductCard = ({ product, updateCartProduct }) => {
  console.log(product);
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
            <button
              onClick={() => {
                updateCartProduct({
                  productId: product.id,
                  quantity: product.cartProducts.quantity + 1,
                });
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                updateCartProduct({
                  productId: product.id,
                  quantity: product.cartProducts.quantity - 1,
                });
              }}
            >
              -
            </button>
          </span>
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
