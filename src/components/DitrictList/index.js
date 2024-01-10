import './index.css'

const DitrictList = props => {
  const {desndData} = props
  const {districtName, countOf} = desndData

  return (
    <li className="district-stat">
      <p className="district-stat-count">
        {countOf}
        <span className="district-name">{districtName}</span>
      </p>
    </li>
  )
}
export default DitrictList
