import {Component} from 'react'

import {textMarshal} from 'text-marshal'
import './file.css'

class PhonePasswordComp extends Component {
  state = {
    mobile: '',
    isd: '',
    showISDError: false,
    faqInput: '',
    showFaqError: false,
    phoneInput: '',
    showPhoneError: false,
    password: '',
    showPasswordError: false,
    confirmPassword: '',
    showConfirmPasswordError: false,
  }

  onChangeISD = event => {
    if (event.target.value !== '') {
      this.setState({
        isd: event.target.value,
        showISDError: false,
      })
    } else {
      this.setState({showISDError: true})
    }
  }

  renderISD = async () => {
    const {isd} = this.state
    const apiUrl =
      'https://gist.githubusercontent.com/pickletoni/021e2e18e83f33d16fee5daa308e6a4e/raw/fc6fd9127efd12d97a3d39f38befc784d6bcbf22/countryPhoneCodes.json'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const isdList = data.map(each => ({
      code: each.code,
    }))
    return (
      <div>
        <select
          value={isd}
          id="isd"
          className="isd-input"
          onChange={onChangeISD}
        >
          {isdList.map(each => (
            <option key={each.code} value={each.code}>
              {each.code}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onChangeMobile = event => {
    this.setState({mobile: event.target.value})
  }

  renderMobileNumber = () => {
    const {mobile} = this.state
    return (
      <div>
        <input
          type="text"
          id="mobilNumber"
          className="mobile-input"
          value={mobile}
          onChange={this.onChangeMobile}
        />
      </div>
    )
  }

  onInputFaqs = event => {
    let theValue = event.target.value
    if (theValue === '') {
      this.setState({showFaqError: true})
    } else {
      let marshaledObject = textMarshal({
        input: theValue,
        template: 'xxx-xxxxxxxx',
      })
      this.setState({
        faqInput: marshaledObject.marshaltext,
        showFaqError: false,
      })
    }
  }

  renderFAQS = () => {
    const {faqInput} = this.state
    return (
      <div className="input-container">
        <label className="label">
          Fax <span className="required">*</span>
        </label>
        <input
          type="text"
          value={faqInput}
          placeholder="011-55541234"
          className="input-field"
          onInput={onInputFaqs}
        />
      </div>
    )
  }

  onInputPhone = event => {
    let theValue = event.target.value
    if (theValue === '') {
      this.setState({showPhoneError: true})
    } else {
      let marshaledObject = textMarshal({
        input: theValue,
        template: 'xxx-xxxxxxxx',
      })
      this.setState({
        phoneInput: marshaledObject.marshaltext,
        showPhoneError: false,
      })
    }
  }

  renderPhone = () => {
    const {phoneInput} = this.state
    return (
      <div className="input-container">
        <label className="label">
          Phone <span className="required">*</span>
        </label>
        <input
          type="text"
          value={phoneInput}
          placeholder="011-55541234"
          className="input-field"
          onInput={onInputPhone}
        />
      </div>
    )
  }

  onChangePassword = event => {
    const theValue = event.target.value
    if (
      theValue.length < 8 ||
      theValue.search(/[a-z]/) < 0 ||
      theValue.search(/[A-Z]/) < 0 ||
      theValue.search(/[0-9]/) < 0
    ) {
      this.setState({showPasswordError: true})
    } else {
      this.setState({
        password: event.target.value,
        showPasswordError: false,
      })
    }
  }

  onChangeConfirmPassword = event => {
    const {password} = this.state
    const confirmedPass = event.target.value

    if (confirmedPass === password) {
      this.setState({
        confirmPassword: event.target.value,
        showConfirmPasswordError: false,
      })
    } else {
      this.setState({showConfirmPasswordError: true})
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderConfirmPasswordField = () => {
    const {confirmPassword} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          className="password-input-field"
          value={confirmPassword}
          onChange={this.onChangeConfirmPassword}
        />
      </div>
    )
  }

  render() {
    const {
      showFaqError,
      showPhoneError,
      showPasswordError,
      showConfirmPasswordError,
    } = this.state
    return (
      <div className="group-container">
        <div className="mobile-container">
          <label className="label">
            Mobile Number <span className="required">*</span>
          </label>
          <div className="isd-mobile-container">
            {this.renderISD()}
            {this.renderMobileNumber()}
          </div>
        </div>

        <div className="row-container">
          <div>
            {this.renderFAQS()}
            {showFaqError && (
              <p className="error-message">Please enter valid faqs number.</p>
            )}
          </div>
          <div>
            {this.renderPhone()}
            {showPhoneError && (
              <p className="error-message">Please enter valid phone number.</p>
            )}
          </div>
        </div>

        {this.renderPasswordField()}
        {showPasswordError && (
          <p className="error-message">
            Must contain at least one number and one uppercase and lowercase
            letter, and at least 8 or more characters
          </p>
        )}

        {this.renderConfirmPasswordField()}
        {showConfirmPasswordError && (
          <p className="error-message">
            confirm password should be same as password
          </p>
        )}
      </div>
    )
  }
}

export default PhonePasswordComp
