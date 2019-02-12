import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logIn } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.logIn(userInfo);
  }

  render() {
    if (this.props.currentUser && this.props.currentUser.id) {
      return <Redirect to="/products" />;
    }
    return (
      <div>
        <div>
          <h1>Connexion</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-selection">
              <label className="form-item">Email</label>
              <input
                className="form-item"
                type="email"
                name="email"
                required="required"
                placeholder="Email"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            <div className="form-selection">
              <label className="form-item">Mot de Passe</label>
              <input
                className="form-item"
                type="password"
                name="password"
                required="required"
                placeholder="Mot de Passe"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <div className="form-selection">
              <input className="form-item" type="submit" value="Se connecter" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps,
  { logIn }
)(SignIn);
