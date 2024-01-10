import './index.css'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  LabelList,
} from 'recharts'

const diffStatus = {
  inProgress: 'Loading',
  success: 'success',
  fail: 'fail',
}
const StateGraphs = props => {
  const {code, currentCard} = props
  const activeCard = currentCard.toLowerCase()
  console.log(activeCard)
  const [timeLineData, setTimeLineData] = useState({
    status: diffStatus.inProgress,
    dataList: [],
  })

  useEffect(() => {
    const graphDataGetter = async () => {
      const response = await fetch(
        `https://apis.ccbp.in/covid19-timelines-data/${code}`,
      )
      const data = await response.json()

      if (response.ok) {
        setTimeLineData({
          status: diffStatus.success,
          dataList: data,
        })
      }
    }
    graphDataGetter()
  }, [])
  const renderLoader = () => (
    <div testid="timelinesDataLoader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderSuccessView = () => {
    const {dataList} = timeLineData
    const {dates} = dataList[code]
    const allDates = Object.keys(dataList[code].dates)
    const getDate = fullDate => {
      const newDate = new Date(fullDate)
      const axisDate = `${newDate.toLocaleString('en-US', {
        month: 'short',
      })} ${newDate.getDate()}`
      return axisDate
    }
    const activeCasesCount = each => {
      const activeCases =
        dataList[code].dates[each].total.confirmed -
        (dataList[code].dates[each].total.recovered +
          dataList[code].dates[each].total.deceased)
      return activeCases
    }
    const getTypesOfData = dataType => {
      const allDatesData = allDates.map(each => ({
        date: getDate(each),
        count:
          dataType === 'active'
            ? activeCasesCount(each)
            : dataList[code].dates[each].total[dataType],
      }))
      return allDatesData
    }

    const tenDateStats = getTypesOfData(activeCard).slice(0, 10)
    console.log(tenDateStats)
    const DataFormatter = number => {
      if (number > 1000 && number < 100000) {
        return `${(number / 100000).toFixed(2).toString()}k`
      }
      if (number > 100000) {
        return `${(number / 100000).toFixed(2).toString()}L`
      }
      return number.toString()
    }
    const getColor = () => {
      switch (activeCard) {
        case 'confirmed':
          return '#9A0E31'
        case 'recovered':
          return '#28A745'
        case 'active':
          return '#3B82F6'
        case 'deceased':
          return '#6C757D'
        default:
          return null
      }
    }
    const activeData = getTypesOfData('active').slice(0, 10)
    const recoveredData = getTypesOfData('recovered').slice(0, 10)
    const deceasedData = getTypesOfData('deceased').slice(0, 10)
    const testedData = getTypesOfData('tested').slice(0, 10)

    return (
      <div className="district-bar-graph">
        <div className="bar-graph-sm">
          <BarChart
            width={800}
            height={300}
            data={tenDateStats}
            margin={{top: 16}}
          >
            <YAxis
              tickFormatter={DataFormatter}
              tickLine={false}
              axisLine={false}
              dataKey="count"
              hide
            />
            <XAxis
              tickSize={1}
              interval={0}
              tickLine={false}
              axisLine={false}
              dataKey="date"
              fontSize={16}
            />

            <Bar
              mirror
              dataKey="count"
              fill={getColor()}
              radius={[6, 6, 0, 0]}
              barSize={48}
              style={{padding: 20}}
            >
              <LabelList
                formatter={DataFormatter}
                position="top"
                fill={getColor()}
                fontSize={16}
              />
            </Bar>
          </BarChart>
        </div>
        <div testid="lineChartsContainer" className="all-graphs-container">
          <h1 className="daily-spreds-heading">Daily Spread Trends</h1>
          <div className="line-graphs-container line-confirmed">
            <p className="line-graph-name confirmed">Confirmed</p>
            <LineChart
              width={800}
              height={300}
              data={tenDateStats}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                style={{stroke: '#FF073A'}}
                axisLine={{strokeWidth: 3}}
                dataKey="date"
                fontSize={16}
              />
              <YAxis
                fontSize={16}
                style={{stroke: '#FF073A'}}
                dataKey="count"
                tickFormatter={DataFormatter}
              />
              <Tooltip />
              <Line
                type="monotone"
                dot={{fill: '#FF073A', stroke: '#FF073A', strokeWidth: 2}}
                dataKey="count"
                stroke="#FF073A"
              />
            </LineChart>
          </div>
          <div className="line-graphs-container line-active">
            <p className="line-graph-name active">Active</p>
            <LineChart
              width={800}
              height={300}
              data={activeData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                style={{stroke: '#007BFF'}}
                axisLine={{strokeWidth: 3}}
                dataKey="date"
                fontSize={16}
              />
              <YAxis
                fontSize={16}
                style={{stroke: '#007BFF'}}
                dataKey="count"
                tickFormatter={DataFormatter}
              />
              <Tooltip />
              <Line
                type="monotone"
                dot={{fill: '#007BFF', stroke: '#007BFF', strokeWidth: 2}}
                dataKey="count"
                stroke="#007BFF"
              />
            </LineChart>
          </div>
          <div className="line-graphs-container line-recovered">
            <p className="line-graph-name recovered">Recovered</p>
            <LineChart
              width={800}
              height={300}
              data={recoveredData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                style={{stroke: '#27A243'}}
                axisLine={{strokeWidth: 3}}
                dataKey="date"
                fontSize={16}
              />
              <YAxis
                fontSize={16}
                style={{stroke: '#27A243'}}
                dataKey="count"
                tickFormatter={DataFormatter}
              />
              <Tooltip />
              <Line
                type="monotone"
                dot={{fill: '#27A243', stroke: '#27A243', strokeWidth: 2}}
                dataKey="count"
                stroke="#27A243"
              />
            </LineChart>
          </div>
          <div className="line-graphs-container line-deceased">
            <p className="line-graph-name deceased">Deceased</p>
            <LineChart
              width={800}
              height={300}
              data={deceasedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                style={{stroke: '#6C757D'}}
                axisLine={{strokeWidth: 3}}
                dataKey="date"
                fontSize={16}
              />
              <YAxis
                fontSize={16}
                style={{stroke: '#6C757D'}}
                dataKey="count"
                tickFormatter={DataFormatter}
              />
              <Tooltip />
              <Line
                type="monotone"
                dot={{fill: '#6C757D', stroke: '#6C757D', strokeWidth: 2}}
                dataKey="count"
                stroke="#6C757D"
              />
            </LineChart>
          </div>
          <div className="line-graphs-container line-tested">
            <p className="line-graph-name tested">Tested</p>
            <LineChart
              width={800}
              height={300}
              data={testedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}
            >
              <XAxis
                style={{stroke: '#9673B9'}}
                axisLine={{strokeWidth: 3}}
                dataKey="date"
                fontSize={16}
              />
              <YAxis
                fontSize={16}
                style={{stroke: '#9673B9'}}
                dataKey="count"
                tickFormatter={DataFormatter}
              />
              <Tooltip />
              <Line
                type="monotone"
                dot={{fill: '#9673B9', stroke: '#9673B9', strokeWidth: 2}}
                dataKey="count"
                stroke="#9673B9"
              />
            </LineChart>
          </div>
        </div>
      </div>
    )
  }
  const renderDiffViews = () => {
    const {status} = timeLineData

    switch (status) {
      case diffStatus.inProgress:
        return renderLoader()
      case diffStatus.success:
        return renderSuccessView()
      default:
        return null
    }
  }
  return <div className="state-graph-container">{renderDiffViews()}</div>
}

export default StateGraphs
