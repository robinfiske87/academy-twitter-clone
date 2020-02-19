import React from 'react';
import { Link } from 'react-router-dom';
import { postUser } from '../services/users';
import { createSession } from '../services/session';

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signupForm: {
        name: '',
        handle: '',
        password: '',
        repeatPw: '',
      },
      error: null,
      isSigningUp: false
    }
  }

  handleInputChange(field, event) {
    this.setState({
      signupForm: {
        ...this.state.signupForm,
        [field]: event.target.value
      }
    })
  }

  async handleSignupClick(event) {
    event.preventDefault();
    const { history } = this.props;
    const { handle, password } = this.state.signupForm;
    try {
      const response = await postUser(this.state.signupForm);
      const { result: token, error } = await createSession({ handle, password });     
  

      if (error) {
        throw new Error(error);
      }

      if(!token) {
        throw new Error('No token received. Try again');
      }

      localStorage.setItem('twitter_clone_token', token);
      history.push('/');
    } catch(error) {
      this.setState({
        error,
      });
    }
  }

  render() {
    const { error, isSigningUp, signupForm } = this.state;

    return (
      <div className="login-container">
        <h1 className="login-header">Twitter-clone</h1>
        <form className="login-form">
          <h3>Sign up form:</h3>
          <div className="input-fields">
            <label className="label-name">
              Name:
            </label>
            <input 
              className="input-name"
              type="text"
              value={this.state.signupForm.name}
              onChange={this.handleInputChange.bind(this, 'name')}
            />
            <label className="label-handle">
              Handle:
            </label>
            <input 
              className="input-handle"
              type="text"
              value={this.state.signupForm.handle}
              onChange={this.handleInputChange.bind(this, 'handle')}
            />
          
            <label className="label-pw">
              Password:
            </label>
            <input 
              className="input-pw"
              type="password"
              value={this.state.signupForm.password}
              onChange={this.handleInputChange.bind(this, 'password')}
            />
            <label className="label-repeatPw">
              Repeat password:
            </label>
            <input 
              className="input-repeatPw"
              type="password"
              value={this.state.signupForm.repeatPw}
              onChange={this.handleInputChange.bind(this, 'repeatPw')}
            />
            <button
              className="signup-submit"
              onClick={this.handleSignupClick.bind(this)}
            >
              Sign up!
            </button>
          </div>
          <div className="login-error">
            {isSigningUp && <p>Signing up...</p>}
            {error && <p>Unable to sign up in:  {error.message}</p>}
          </div>
          <div className="signup-container">
            <Link 
              to="/login"
              className="signup-link"
            >Back to login</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;