import './index.css'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import StateStats from '../StateStats'

const Table = props => {
  const {onToggleAccedning, onToggleDecending, stateWiseData} = props
  const onClickAccd = () => {
    onToggleAccedning()
  }
  const onClickDccd = () => {
    onToggleDecending()
  }
  return (
    <div testid='stateWiseCovidDataTable' className='state-wise-data-div'>
      <div className='data-col-names'>
        <div className='sorting-state-div'>
          <p className='state-name'>States/UT</p>
          <button
            testid='ascendingSort'
            onClick={onClickAccd}
            className='sorting-btn'
            aria-label='accending-btn'
            type='button'
          >
            <FcGenericSortingAsc className='sort-icons' />
          </button>
          <button
            testid='descendingSort'
            onClick={onClickDccd}
            className='sorting-btn'
            aria-label='decending-btn'
            type='button'
          >
            <FcGenericSortingDesc className='sort-icons' />
          </button>
        </div>
        <div className='stats-names'>
          <p className='data-name'>Confirmed</p>
          <p className='data-name'>Active</p>
          <p className='data-name'>Recovered</p>
          <p className='data-name'>Deceased</p>
          <p className='data-name'>Population</p>
        </div>
      </div>

      <ul className='data-col-values'>
        {stateWiseData.map(each => (
          <StateStats key={`${each.stateName}state`} dataDetails={each} />
        ))}
      </ul>
    </div>
  )
}

export default Table
