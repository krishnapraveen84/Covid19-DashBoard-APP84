import './index.css'
import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'

const SearchSuggestion = props => {
  const {searchDetails} = props
  const stateCode = searchDetails.state_code
  return (
    <Link to={`/state/${stateCode}`} className="links">
      <li className="search-results">
        <p className="search-result-name">{searchDetails.state_name}</p>
        <div className="search-code-box">
          <p className="search-result-code">{searchDetails.state_code}</p>
          <BiChevronRightSquare className="search-code-icon" />
        </div>
      </li>
    </Link>
  )
}

export default SearchSuggestion
