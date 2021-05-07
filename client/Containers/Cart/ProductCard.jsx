import React from 'react';
import { connect } from 'react-redux';
import {
  ProductCardForCart,
  Column,
} from '../../components/styles/ProductCardForCart';
import DeleteButton from '../../components/styles/DeleteButton';
import IncrementButton from '../../components/styles/IncrementButton';
import { updateCartProduct } from '../../store/cart/cart';

const ProductCard = ({ cartProduct, updateCartProduct }) => {
  console.log(cartProduct);
  const { quantity, product, productId } = cartProduct;
  const { price, name, imageUrl } = product;
  const totalPriceOfItem = quantity * price;
  return (
    <>
      <ProductCardForCart>
        <Column>
          <h3>{name}</h3>
          <img src={imageUrl} width="200rem" overflow="hidden" />
        </Column>
        <Column>
          <div>
            <IncrementButton
              onClick={() => {
                updateCartProduct({
                  productId,
                  quantity: quantity + 1,
                });
              }}
            >
              +
            </IncrementButton>
            <p>{quantity}</p>
            <IncrementButton
              onClick={() => {
                updateCartProduct({
                  productId,
                  quantity: quantity - 1,
                });
              }}
            >
              -
            </IncrementButton>
          </div>
        </Column>
        <p>${price}</p>
        <Column>
          <h2>${totalPriceOfItem}</h2>
          <DeleteButton
            onClick={() =>
              updateCartProduct({
                productId,
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

const mapStateToProps = (state, { cartProduct }) => ({
  cartProduct,
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateCartProduct: ({ productId, quantity }) =>
      dispatch(updateCartProduct({ productId, quantity })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
