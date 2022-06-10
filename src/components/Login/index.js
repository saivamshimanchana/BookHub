import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  // stores the username and password in the state

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  // on successful response

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  // on failure response

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  // renders the password filed

  renderPasswordField = () => {
    const {password} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1654138677/Loginpage-img_zswrqc.png"
          className="login-website-logo-img"
          alt="login website logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="login-logo-container">
            <img
              src="https://res.cloudinary.com/dnnzqsug1/image/upload/v1654146640/Bookhub-logo_mgfumk.png"
              className="company-logo"
              alt="website login"
            />
            <p className="company-text">OOK HUB</p>
          </div>
          <div className="input-username-container">
            {this.renderUsernameField()}
          </div>
          <div className="input-password-container">
            {this.renderPasswordField()}
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          <div className="login-btn-container">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
