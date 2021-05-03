import React, { Component } from 'react';
import { FormGroup, Label, Input } from '../../components/styles/Forms';
import FeaturedButton from '../../components/styles/FeaturedButton';
import { connect } from 'react-redux';
import { productCreate } from '../../store/user/userList';

class AddProduct extends Component {
  state = {
    name: '',
    inventory: 0,
    height: 0.0,
    width: 0.0,
    depth: 0.0,
    material: '',
    color: '',
    imageUrl: '',
    price: 0.0,
    description: '',
    type: '',
    style: '',
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };
  onSubmit = (event) => {
    event.preventDefault();
    const { createProduct } = this.props;
    createProduct(this.state);
  };

  render() {
    const { onChange, onSubmit } = this;
    const {
      name,
      inventory,
      height,
      width,
      depth,
      material,
      color,
      imageUrl,
      price,
      description,
      type,
      style,
    } = this.state;
    return (
      <>
        <FormGroup onSubmit={onSubmit}>
          <h2>Your Profile</h2>
          <Label>Name:</Label>
          <Input value={name} onChange={onChange} name="name" />
          <Label>Inventory:</Label>
          <Input value={inventory} onChange={onChange} name="inventory" />
          <Label>Height:</Label>
          <Input value={height} onChange={onChange} name="height" />
          <Label>Width:</Label>
          <Input value={width} onChange={onChange} name="width" />
          <Label>Depth:</Label>
          <Input value={depth} onChange={onChange} name="depth" />
          <Label>Material:</Label>
          <Input value={material} onChange={onChange} name="material" />
          <Label>Color:</Label>
          <Input value={color} onChange={onChange} name="color" />
          <Label>ImageUrl:</Label>
          <Input value={imageUrl} onChange={onChange} name="imageUrl" />
          <Label>Price:</Label>
          <Input value={price} onChange={onChange} name="price" />
          <Label>Description:</Label>
          <Input value={description} onChange={onChange} name="description" />
          <Label>Type:</Label>
          <Input value={type} onChange={onChange} name="type" />
          <Label>Style:</Label>
          <Input value={style} onChange={onChange} name="style" />
          <FeaturedButton>Submit</FeaturedButton>
        </FormGroup>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProduct: (product) => dispatch(productCreate(product)),
  };
};
export default connect(null, mapDispatchToProps)(AddProduct);
