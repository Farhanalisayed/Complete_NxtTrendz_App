import {Component} from 'react'
import './file.css'

class NameEmailComp extends Component {
  state = {
    firstName: '',
    showFirstNameError: false,
    lastName: '',
    showLastNameError: false,
    email: '',
    showEmailError: false,
  }

  onChangeRadio = event => {
    this.setState({
      radio: event.target.value,
    })
  }

  renderRadioField = () => (
    <div className="input-container">
      <label className="label">
        Individual/Enterprise/Government <span className="required">*</span>
      </label>
      <div className="radio-container">
        <div>
          <input
            type="radio"
            value="Individual"
            id="individual"
            name="radios"
            className="radio-input"
            onClick={onChangeRadio}
            checked
          />
          <label htmlFor="individual" className="radio-label">
            Individual
          </label>
        </div>
        <div>
          <input
            type="radio"
            value="Enterprise"
            id="enterprise"
            name="radios"
            className="radio-input"
            onClick={onChangeRadio}
          />
          <label htmlFor="enterprise" className="radio-label">
            Enterprise
          </label>
        </div>
        <div>
          <input
            type="radio"
            value="Government"
            id="government"
            name="radios"
            className="radio-input"
            onClick={onChangeRadio}
          />
          <label htmlFor="government" className="radio-label">
            Government
          </label>
        </div>
      </div>
    </div>
  )

  onChangeFirstName = event => {
    if (event.target.value !== '') {
      this.setState({
        firstName: event.target.value,
        showFirstNameError: false,
      })
    } else {
      this.setState({showFirstNameError: true})
    }
  }

  renderFirstName = () => {
    const {firstName} = this.state
    return (
      <div className="input-container">
        <label className="label">
          First Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          className="name-input"
          onChange={onChangeFirstName}
        />
      </div>
    )
  }

  onChangeLastName = event => {
    if (event.target.value !== '') {
      this.setState({
        lastName: event.target.value,
        showLastNameError: false,
      })
    } else {
      this.setState({showLastNameError: true})
    }
  }

  renderLastName = () => {
    const {lastName} = this.state
    return (
      <div className="input-container">
        <label className="label">
          Last Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          className="name-input"
          onChange={onChangeLastName}
        />
      </div>
    )
  }

  onChangeEmail = event => {
    if (event.target.value !== '') {
      this.setState({
        email: event.target.value,
        showEmailError: false,
      })
    } else {
      this.setState({showEmailError: true})
    }
  }

  renderEmail = () => {
    const {email} = this.state
    return (
      <div className="input-container">
        <label className="label">
          Email <span className="required">*</span>
        </label>
        <input
          type="text"
          value={email}
          placeholder="Email"
          className="email-input"
          onChange={onChangeEmail}
        />
      </div>
    )
  }

  render() {
    const {showFirstNameError, showLastNameError, showEmailError} = this.state
    return (
      <div className="group-container">
        {this.renderRadioField()}

        <div className="row-container">
          <div>
            {this.renderFirstName()}
            {showFirstNameError && (
              <p className="error-message">Please enter valid first name.</p>
            )}
          </div>
          <div>
            {this.renderLastName()}
            {showLastNameError && (
              <p className="error-message">Please enter valid last name.</p>
            )}
          </div>
        </div>

        {this.renderEmail()}
        {showEmailError && (
          <p className="error-message">Please enter valid email.</p>
        )}
      </div>
    )
  }
}

export default NameEmailComp
