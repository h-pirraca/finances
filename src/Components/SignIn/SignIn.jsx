import React, { Component } from 'react';
import Sign from './SignIn.module.css';
import ParticlesBg from 'particles-bg';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/signinFinances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid username or password.');
      }

      // Assuming your API returns a token upon successful login
      const { token, name } = await response.json();

      // Save the token in localStorage or state to indicate the user is authenticated
      localStorage.setItem('token', token);
      localStorage.setItem('username', this.state.username);
      localStorage.setItem('name', name);

      this.props.onRouteChange();
    } catch (err) {
      this.setState({ error: err.message });
    }
  };

  render() {
    return (
      <>
        <div className={Sign.login}>
          <div className={Sign.formContainer}>
            <h2>Login</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  className={Sign.log_inp}
                  type="text"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div>
                <input
                  className={Sign.log_inp}
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
              <div>
                <button className={Sign.log_but} type="submit">
                  Login
                </button>
              </div>
              {this.state.error && <p className={Sign.error}>{this.state.error}</p>}
            </form>
          </div>
        </div>
        <ParticlesBg type="cobweb" bg={true} />
      </>
    );
  }
}

export default SignIn;