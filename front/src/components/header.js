import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userLogOut } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind();
  }

  logOut() {
    this.props.userLogOut();
  }

  render() {
    const path = this.props.location.pathname;
    const signedInHeader = (
      <div className="header">
        <div className="header-section-tab">
          <Link
            className={`header-tab ${
              path === '/products' ? 'tab-selected' : ''
            }`}
            to="/products"
          >
            Produits
          </Link>
          <Link
            className={`header-tab ${path === '/me' ? 'tab-selected' : ''}`}
            to="/me"
          >
            Mes achats
          </Link>
        </div>
        <div className="header-section-button">
          <label>
            Bonjour{' '}
            {`${this.props.currentUser.firstName} ${
              this.props.currentUser.lastName
            }`}
          </label>
          <Link className="header-button logout" onClick={this.logOut} to="/">
            Se déconnecter
          </Link>
        </div>
      </div>
    );

    const visitorHeader = (
      <div className="header">
        <div className="header-section-tab" />
        <div className="header-section-button">
          <Link className="header-button" to="/">
            Se connecter
          </Link>
          <Link className="header-button" to="/signup">
            S'inscrire
          </Link>
        </div>
      </div>
    );

    return this.props.currentUser.id ? signedInHeader : visitorHeader;
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps,
  { userLogOut }
)(Header);
