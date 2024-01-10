
import './index.css'
import {Link} from 'react-router-dom'

const StateStats = props => {
  const {dataDetails} = props
  const id = dataDetails.stateCode
  return (
    <li className="data-values-div">
      <div className="state-name-card">
        <Link  className="link" to={`/state/${id}`}>
          <p className="state-name">{dataDetails.stateName}</p>
        </Link>
      </div>
      <div className="stats-names">
        <p className="data-name confirmed">{dataDetails.total.confirmed}</p>
        <p className="data-name active">
          {dataDetails.total.confirmed -
            (dataDetails.total.recovered + dataDetails.total.deceased)}
        </p>
        <p className="data-name recovered">{dataDetails.total.recovered}</p>
        <p className="data-name Deceased">{dataDetails.total.deceased}</p>
        <p className="data-name population">{dataDetails.population}</p>
      </div>
    </li>
  )
}

export default StateStats
