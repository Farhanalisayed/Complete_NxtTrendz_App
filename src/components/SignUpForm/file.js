import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import NameEmailComp from '../NameEmailComp'
import AddressComp from '../AddressComp'
import PhonePasswordComp from '../PhonePasswordComp'
import './index.css'

class SignUpForm extends Component {
  state = {
    showSubmitError: false,
    errorMsg: '',
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

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <NameEmailComp />
          <AddressComp />
          <PhonePasswordComp />
          <button type="submit" className="login-button">
            SIGN UP
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default SignUpForm
