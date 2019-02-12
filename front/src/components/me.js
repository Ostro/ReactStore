import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyProduct } from '../actions';
import { Redirect } from 'react-router-dom';

class Me extends Component {
  componentWillMount() {
    this.props.getMyProduct(this.props.currentUser.id);
  }

  render() {
    if (!this.props.currentUser || !this.props.currentUser.id) {
      return <Redirect to="/" />;
    }

    if (!this.props.me.products || !this.props.me.products[0]) {
      return (
        <div>
          <h1>Mes produits achetées</h1>
          <h3>Vous n'avez acheté aucun produit pour l'instant.</h3>
        </div>
      );
    }

    return (
      <div>
        <h1>Mes produits achetées</h1>
        <div className="grid">
          {this.props.me.products.map(product => (
            <div className="grid-item" key={product.id}>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  me: state.user.me,
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps,
  { getMyProduct }
)(Me);
