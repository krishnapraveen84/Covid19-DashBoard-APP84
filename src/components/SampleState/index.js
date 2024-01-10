import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Header from '../Header'
import Footer from '../Footer'
import StateGraphs from '../StateGraphs'
import DitrictList from '../DitrictList'
import './index.css'

const diffStatus = {
  inProgress: 'Loading',
  success: 'success',
  fail: 'fail',
}
const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]
class SpecificState extends Component {
  state = {
    status: diffStatus.inProgress,
    data: [],
    activeCard: 'Confirmed',
  }

  componentDidMount = () => {
    this.getStateData()
  }

  getStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    console.log(stateCode)
    const response = await fetch(`https://apis.ccbp.in/covid19-state-wise-data`)
    const resData = await response.json()

    const stateNameGetter = code => {
      const name = statesList.filter(each => each.state_code === code)
      return name[0].state_name
      // for (const state of statesList) {
      //   if (state.state_code === code) {
      //     return state.state_name
      //   }
      // }
    }
    const newData = statesList.map(each => ({
      stateName: stateNameGetter(each.state_code),
      stateCode: each.state_code,
      districts: resData[each.state_code].districts,
      total: resData[each.state_code].total,
      lastUpdatedDate: resData[each.state_code].meta.last_updated,
    }))
    const filtredData = newData.find(each => each.stateCode === stateCode)
    if (response.ok) {
      this.setState({status: diffStatus.success, data: filtredData})
    } else {
      this.setState({status: diffStatus.fail})
    }
  }

  renderLoader = () => (
    <div testid="stateDetailsLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onToggelActiveCard = name => {
    this.setState({activeCard: name})
  }

  renderSuccessView = () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const {data, activeCard} = this.state
    const {districts, stateName, total, lastUpdatedDate} = data
    const districtsNames = Object.keys(districts)
    const newDate = new Date(lastUpdatedDate)
    const frmtDate = `${newDate.toLocaleString('default', {
      month: 'long',
    })} ${newDate.getDate()} ${newDate.getFullYear()}`

    const activeCasesCount = each => {
      const activeCases =
        districts[each].total.confirmed -
        (districts[each].total.recovered + districts[each].total.deceased)
      if (!activeCases) {
        return 0
      }
      return activeCases
    }
    const countGetter = each => {
      const counts =
        activeCard === 'Active'
          ? activeCasesCount(each)
          : districts[each].total[activeCard.toLowerCase()]
      return counts
    }
    const getCurrentDecDistrictDetails = () => {
      const currentData = districtsNames.map(each => ({
        districtName: each,
        countOf: countGetter(each),
      }))
      const descData = currentData.sort((a, b) => b.countOf - a.countOf)
      return descData
    }

    const districtDecendingData = getCurrentDecDistrictDetails()
    console.log(districtDecendingData)
    return (
      <div className="state-content-container">
        <div className="wrapper-container">
          <div className="col-wrapper-1">
            <h1 className="name-card">{stateName}</h1>
            <p className="para">{`Last updated on ${frmtDate}`}</p>
          </div>
          <div className="col-wrapper-2">
            <p className="tested-name">Tested</p>
            <p className="tested-value">{total.tested}</p>
          </div>
        </div>

        <ul className="stats-container">
          <li
            key="confirmed1"
            className={`state-stat-card ${
              activeCard === 'Confirmed' ? 'click-confirmed' : ''
            }`}
            testid="stateSpecificConfirmedCasesContainer"
          >
            <button
              onClick={() => this.onToggelActiveCard('Confirmed')}
              className={`state-btn confirmed `}
              type="button"
            >
              <p className="stat-name">Confirmed</p>
              <img
                className="card-img"
                src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/check-mark_1confirm_bfxayb.png"
                alt="state specific confirmed cases pic"
              />
              <p className="count">{total.confirmed}</p>
            </button>
          </li>

          <li
            key="active1"
            className={`state-stat-card ${
              activeCard === 'Active' ? 'click-active' : ''
            }`}
            testid="stateSpecificActiveCasesContainer"
          >
            <button
              onClick={() => this.onToggelActiveCard('Active')}
              className={`state-btn active `}
              type="button"
            >
              <p className="stat-name">Active</p>
              <img
                className="card-img"
                src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/protection_2protect_a5jx7m.png"
                alt="state specific active cases pic"
              />
              <p className="count">
                {total.confirmed - (total.recovered + total.deceased)}
              </p>
            </button>
          </li>

          <li
            key="recovered1"
            className={`state-stat-card ${
              activeCard === 'Recovered' ? 'click-recovered' : ''
            }`}
            testid="stateSpecificRecoveredCasesContainer"
          >
            <button
              onClick={() => this.onToggelActiveCard('Recovered')}
              className={`state-btn recovered `}
              type="button"
            >
              <p className="stat-name">Recovered</p>
              <img
                className="card-img"
                src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/recovered_1recoved_aowj9p.png"
                alt="state specific recovered cases pic"
              />
              <p className="count">{total.recovered}</p>
            </button>
          </li>

          <li
            key="deceased1"
            className={`state-stat-card ${
              activeCard === 'Deceased' ? ' click-deceased' : ''
            }`}
            testid="stateSpecificDeceasedCasesContainer"
          >
            <button
              onClick={() => this.onToggelActiveCard('Deceased')}
              className={`state-btn Deceased `}
              type="button"
            >
              <p className="stat-name">Deceased</p>
              <img
                className="card-img"
                src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/breathing_taou1u.png"
                alt="state specific deceased cases pic"
              />
              <p className="count">{total.deceased}</p>
            </button>
          </li>
        </ul>

        <div
          testid="lineChartsContainer"
          className={`district-wise-data `}
        >
          <h1 className={`district-heading ${activeCard.toLowerCase()}`}>
            Top Districts
          </h1>
          <ul
            className="district-data-list"
            testid="topDistrictsUnorderedList"
          >
            {districtDecendingData.map(each => (
              <DitrictList
                key={`${each.districtName}-district`}
                desndData={each}
              />
            ))}
          </ul>
        </div>
        <StateGraphs code={stateCode} currentCard={activeCard} />
        <Footer />
      </div>
    )
  }

  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStatus.inProgress:
        return this.renderLoader()
      case diffStatus.success:
        return this.renderSuccessView()
      case diffStatus.fail:
        return <h1>Failed</h1>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="state-container">
        <Header />
        {this.renderDiffrentViews()}
      </div>
    )
  }
}

export default SpecificState
