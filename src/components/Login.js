import React from 'react';
import { createSession } from '../services/session';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginForm: {
        handle: '',
        password: '',
      },
      error: null,
      isLoggingIn: false
    }
  }

  handleInputChange(field, event) {
    this.setState({
      loginForm: {
        ...this.state.loginForm,
        [field]: event.target.value
      }
    })
  }

  async handleLoginAttempt(event) {
    event.preventDefault();
    const { history } = this.props;
    const { handle, password } = this.state.loginForm;
    try {
      this.setState({ isLoggingIn: true, error: null });
      const { result: token, error } = await createSession({ handle, password });

      if (error) {
        throw new Error(error);
      }

      if(!token) {
        throw new Error('No token received. Try again');
      }

      localStorage.setItem('twitter_clone_token', token);
      history.replace('/');
    } catch (error) {
      this.setState({ error, isLoggingIn: false })
    }
  }

  render() {
    const { error, isLoggingIn } = this.state;


    return (
      <div className="login-container">
        <h1 className="login-header">Twitter-clone</h1>
        <form className="login-form">
          <h3>Login:</h3>
          <div className="input-fields">
            <label className="label-handle">
              Handle:
            </label>
            <input 
              className="input-handle"
              type="text"
              value={this.state.loginForm.handle}
              onChange={this.handleInputChange.bind(this, 'handle')}
            />
          
            <label className="label-pw">
              Password:
            </label>
            <input 
              className="input-pw"
              type="password"
              value={this.state.loginForm.password}
              onChange={this.handleInputChange.bind(this, 'password')}
            />
            <button
              className="input-submit"
              onClick={this.handleLoginAttempt.bind(this)}
            >
              Login
            </button>
          </div>
          <div className="login-error">
            {isLoggingIn && <p>Logging in...</p>}
            {error && <p>Unable to log in:  {error.message}</p>}
          </div>
          <div className="signup-container">
            <Link 
              to="/signup"
              className="signup-link"
            >Sign up</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;