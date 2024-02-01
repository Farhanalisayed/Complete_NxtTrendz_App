import {Component} from 'react'
import './file.css'

class AddressComp extends Component {
  state = {
    address: '',
    showAddressError: false,
    activeCountry: '',
    showCountryError: false,
    activeState: '',
    showStateError: false,
    activeCity: '',
    showCityError: false,
    pincode: '',
    showPinError: false,
  }

  onChangeAddress = event => {
    if (event.target.value !== '') {
      this.setState({
        address: event.target.value,
        showAddressError: false,
      })
    } else {
      this.setState({showAddressError: true})
    }
  }

  renderAddrssField = () => {
    const {address} = this.state
    return (
      <div className="place-container">
        <label className="label">
          Address <span className="required">*</span>
        </label>
        <input
          type="text"
          value={address}
          placeholder="Address"
          className="address-input"
          onChange={onChangeAddress}
        />
      </div>
    )
  }

  onChangeCountry = event => {
    if (event.target.value !== '') {
      this.setState({
        activeCountry: event.target.value,
        showCountryError: false,
      })
    } else {
      this.setState({showCountryError: true})
    }
  }

  renderCountryList = async () => {
    const {activeCountry} = this.state
    const apiUrl =
      'https://github.com/devopsdeveloper1107/Country-state-city-table-in-json/blob/main/tbl_country.json'
    const response = await fetch(apiUrl)
    const data = await response.json()
    const countries = data.map(each => ({
      countryId: each.country_id,
      countryName: each.country_name,
    }))

    return (
      <div className="place-container">
        <label className="label">
          Country <span className="required">*</span>
        </label>
        <select
          value={activeCountry}
          id="country"
          className="place-input"
          onChange={onChangeCountry}
        >
          {countries.map(each => (
            <option key={each.countryId} value={each.countryId}>
              {each.countryName}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onChangeStates = event => {
    if (event.target.value !== '') {
      this.setState({
        activeState: event.target.value,
        showStateError: false,
      })
    } else {
      this.setState({showStateError: true})
    }
  }

  renderStateList = async () => {
    const {activeState, activeCountry} = this.state
    const apiUrl =
      'https://github.com/devopsdeveloper1107/Country-state-city-table-in-json/blob/main/tbl_state.json'
    const statesResponse = await fetch(apiUrl)
    const statesData = await statesResponse.json()
    const updatedData = statesData.map(each => ({
      stateId: each.state_id,
      stateName: each.state_name,
      countryId: each.country_id,
    }))
    const filteredStates = updatedData.filter(
      each => each.countryId === activeCountry,
    )
    return (
      <div className="place-container">
        <label className="label">
          Country <span className="required">*</span>
        </label>
        <select
          value={activeState}
          id="states"
          className="place-input"
          onChange={onChangeStates}
        >
          {filteredStates.map(each => (
            <option key={each.stateId} value={each.stateId}>
              {each.stateName}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onChangeCities = event => {
    if (event.target.value !== '') {
      this.setState({
        activeCity: event.target.value,
        showCityError: false,
      })
    } else {
      this.setState({showCityError: true})
    }
  }

  renderCityList = async () => {
    const {activeState, activeCity} = this.state
    const apiUrl =
      'https://raw.githubusercontent.com/devopsdeveloper1107/Country-state-city-table-in-json/main/tbl_city.json'
    const citiesResponse = await fetch(apiUrl)
    const cities = await citiesResponse.json()
    const citiesData = cities[2].data
    const updated = citiesData.map(each => ({
      cityId: each.city_id,
      cityName: each.city_name,
      stateId: each.state_id,
    }))
    const filteredCities = updated.filter(each => each.stateId === activeState)

    return (
      <div className="place-container">
        <label className="label">
          City <span className="required">*</span>
        </label>
        <select
          value={activeCity}
          id="cities"
          className="place-input"
          onChange={onChangeCities}
        >
          {filteredCities.map(each => (
            <option key={each.cityId} value={each.cityId}>
              {each.cityName}
            </option>
          ))}
        </select>
      </div>
    )
  }

  onChangePin = event => {
    if (event.target.value.length === 6) {
      this.setState({
        pincode: event.target.value,
        showPinError: false,
      })
    } else {
      this.setState({showPinError: true})
    }
  }

  renderPin = () => {
    const {pincode} = this.state
    return (
      <div className="place-container">
        <label className="label">
          Pincode <span className="required">*</span>
        </label>
        <input
          type="text"
          value={pincode}
          placeholder="ex:110042"
          className="place-input"
          onChange={onChangePin}
        />
      </div>
    )
  }

  render() {
    const {
      showAddressError,
      showCountryError,
      showStateError,
      showCityError,
      showPinError,
    } = this.state
    return (
      <div className="group-container">
        {this.renderAddrssField()}
        {showAddressError && (
          <p className="error-message">Please select your address.</p>
        )}

        <div className="row-container">
          <div>
            {this.renderCountryList()}
            {showCountryError && (
              <p className="error-message">Please select your country.</p>
            )}
          </div>
          <div>
            {this.renderStateList()}
            {showStateError && (
              <p className="error-message">Please select your state.</p>
            )}
          </div>
        </div>

        <div className="row-container">
          <div>
            {this.renderCityList()}
            {showCityError && (
              <p className="error-message">Please select your city.</p>
            )}
          </div>
          <div>
            {this.renderPin()}
            {showPinError && (
              <p className="error-message">Please enter valid pincode.</p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default AddressComp
