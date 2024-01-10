import './index.css'

const Stats = props => {
  const {TotalStats} = props
  const sumOfNums = array => array.reduce((sum, currentVal) => sum + currentVal)
  const TotalConfirmedCases = sumOfNums(TotalStats.map(each => each.confirmed))
  const TotalDecreasedCases = sumOfNums(TotalStats.map(each => each.deceased))
  const TotalRecovedCases = sumOfNums(TotalStats.map(each => each.recovered))
  const TotalActiveCases =
    TotalConfirmedCases - (TotalRecovedCases + TotalDecreasedCases)

  return (
    <div className="country-wide-stats-card">
      <ul className="stats-container">
        <li
          key="confirmedCases"
          testid="countryWideConfirmedCases"
          className="stat-btn confirmed"
        >
          <p className="stat-name">Confirmed</p>
          <img
            className="card-img"
            src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/check-mark_1confirm_bfxayb.png"
            alt="country wide confirmed cases pic"
          />
          <p className="count">{TotalConfirmedCases}</p>
        </li>
        <li
          key="activeCases"
          testid="countryWideActiveCases"
          className="stat-btn active"
        >
          <p className="stat-name">Active</p>
          <img
            className="card-img"
            src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/protection_2protect_a5jx7m.png"
            alt="country wide active cases pic"
          />
          <p className="count">{TotalActiveCases}</p>
        </li>
        <li
          key="recoveredCase"
          testid="countryWideRecoveredCases"
          className="stat-btn recovered"
        >
          <p className="stat-name">Recovered</p>
          <img
            className="card-img"
            src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/recovered_1recoved_aowj9p.png"
            alt="country wide recovered cases pic"
          />
          <p className="count">{TotalRecovedCases}</p>
        </li>
        <li
          key="deceasedCases"
          testid="countryWideDeceasedCases"
          className="stat-btn decreased"
        >
          <p className="stat-name">Deceased</p>
          <img
            className="card-img"
            src="https://res.cloudinary.com/dnwwyvtjx/image/upload/v1704263764/breathing_taou1u.png"
            alt="country wide deceased cases pic"
          />
          <p className="count">{TotalDecreasedCases}</p>
        </li>
      </ul>
    </div>
  )
}

export default Stats
