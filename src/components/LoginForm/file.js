import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    showSubmitError: false,
    showEmailError: false,
    showPasswordError: false,
    errorMsg: '',
  }

  onChangeEmail = event => {
    this.setState({
      email: event.target.value,
      showEmailError: false,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
      showPasswordError: false,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/products')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {email, password} = this.state

    if (email === '') {
      this.setState({showEmailError: true})
    } else if (password === '') {
      this.setState({showPasswordError: true})
    } else {
      const userDetails = {email, password}
      const url = 'http://localhost:3000/login'
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
  }

  renderPasswordField = () => {
    const {password, showPasswordError} = this.state

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
        {showPasswordError && <p className="error-message">*Required</p>}
      </>
    )
  }

  renderEmailField = () => {
    const {email, showEmailError} = this.state

    return (
      <>
        <label className="input-label" htmlFor="email">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={email}
          onChange={this.onChangeEmail}
          placeholder="Email id"
        />
        {showEmailError && <p className="error-message">*Required</p>}
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
        <form className="form-container" onSubmit={this.submitForm}>
          <div className="input-container">{this.renderEmailField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <Link to="/forgotPassword" className="link-btn">
            <button className="forgot-password-btn">Forgot Password</button>
          </Link>
          <button type="submit" className="login-button">
            LOG ME IN
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
