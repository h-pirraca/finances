import React, { Component } from 'react';
import './App.css';

import SignIn from './Components/SignIn/SignIn';
import Navigation from './Pages/Navigation/Navigation';

class App extends Component{
  constructor(){
    super();
    this.state = {
      route: 'loading' //change to loading
    }
  }

  componentDidMount() {
    this.verifyToken();
  }

  verifyToken() {
    const token = localStorage.getItem('token'); // Assuming you have a token stored in localStorage

    if (token) {
      fetch(process.env.REACT_APP_SERVER_LINK+'/checkAuth', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ route: 'home' });
          } else {
            throw new Error('Authentication failed');
          }
        })
        .catch((error) => {
          console.log('Authentication failed:', error);
          this.setState({ route: 'signin' });
        });
    } else {
      // Handle the case where there is no token in localStorage
      this.setState({ route: 'signin' }); //change to signin
    }
  }

  onRouteChange = () => {
    this.setState({ route: 'home' });
  };

  handleLogout = () => {
    // Clear the token and user data from localStorage or wherever you store them
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
  
    // Update the route state to 'signin' to ensure that SignIn is rendered after logout
    this.setState({ route: 'signin' });
  };

  render(){
    return(
      <div className='App'>
        {this.state.route === 'signin' ? (
          <SignIn
            onRouteChange={this.onRouteChange}
          />
        ) : (
          <Navigation onLogout={this.handleLogout} />
        )}
      </div>
    )
  }

}

export default App;
