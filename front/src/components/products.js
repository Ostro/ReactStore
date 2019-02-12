import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts, createProducts, buyProduct } from '../actions';
import { Redirect } from 'react-router-dom';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProductForm: false,
      product: {
        name: '',
        description: '',
        price: '',
      },
    };

    this.toggleProductForm = this.toggleProductForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.buyProduct = this.buyProduct.bind(this);
  }

  componentWillMount() {
    this.props.fetchProducts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.props.products.push(nextProps.product);
    }
  }

  onChange(event) {
    this.setState({
      product: {
        ...this.state.product,
        [event.target.name]: event.target.value,
      },
    });
  }

  toggleProductForm() {
    this.setState({
      showProductForm: !this.state.showProductForm,
    });
  }

  onClick(event) {
    event.preventDefault();

    this.props.createProducts(this.props.currentUser.id, this.state.product);
  }

  buyProduct(productId) {
    return () => this.props.buyProduct(this.props.currentUser.id, productId);
  }

  render() {
    if (!this.props.currentUser || !this.props.currentUser.id) {
      return <Redirect to="/" />;
    }

    const addProductsButton = (
      <button className="form-item" onClick={this.toggleProductForm}>
        Ajouter un produit
      </button>
    );
    const productForm = (
      <form className="form">
        <div className="form-selection">
          <label className="form-item">Nom du Produit:</label>
          <input
            className="form-item"
            type="text"
            name="name"
            onChange={this.onChange}
          />
        </div>
        <div className="form-selection">
          <label className="form-item">Description du Produit:</label>
          <input
            className="form-item"
            type="text"
            name="description"
            onChange={this.onChange}
          />
        </div>
        <div className="form-selection">
          <label className="form-item">Prix du Produit:</label>
          <input
            className="form-item"
            type="number"
            name="price"
            onChange={this.onChange}
          />
        </div>
        <div className="form-selection">
          <button className="form-item" onClick={this.onClick}>
            Créer le produit
          </button>
        </div>
      </form>
    );

    return (
      <div>
        <h1>Les produits</h1>
        {this.props.currentUser.role === 'admin' ? addProductsButton : ''}
        {this.state.showProductForm ? productForm : ''}
        <div className="grid">
          {this.props.products.map(product => (
            <div className="grid-item" key={product.id}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>
                <button onClick={this.buyProduct(product.id)}>
                  Acheter ce produit
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  products: state.products.items,
  product: state.products.item,
});

export default connect(
  mapStateToProps,
  { fetchProducts, createProducts, buyProduct }
)(Products);
