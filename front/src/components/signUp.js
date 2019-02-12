import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitUser } from '../actions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.submitUser(user);
  }

  render() {
    if (this.props.currentUser && this.props.currentUser.id) {
      return <Redirect to="/products" />;
    }
    return (
      <div>
        <h1>Inscription</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-selection">
            <label className="form-item">Prénom</label>
            <input
              className="form-item"
              type="text"
              name="email"
              required="required"
              placeholder="Prénom"
              value={this.state.firstName}
              onChange={event =>
                this.setState({ firstName: event.target.value })
              }
            />
          </div>
          <div className="form-selection">
            <label className="form-item">Nom</label>
            <input
              className="form-item"
              type="text"
              name="email"
              required="required"
              placeholder="nom"
              value={this.state.lastName}
              onChange={event =>
                this.setState({ lastName: event.target.value })
              }
            />
          </div>
          <div className="form-selection">
            <label className="form-item">Email</label>
            <input
              className="form-item"
              type="email"
              name="email"
              required="required"
              placeholder="Email"
              value={this.state.email}
              onChange={event => this.setState({ email: event.target.value })}
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
              onChange={event =>
                this.setState({ password: event.target.value })
              }
            />
          </div>
          <div className="form-selection">
            <input className="form-item" type="submit" value="S'inscrire" />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps,
  { submitUser }
)(SignIn);
