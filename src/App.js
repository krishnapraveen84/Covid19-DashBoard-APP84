import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
// import State from './components/State'
import SpecificState from './components/SampleState'
import About from './components/About'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/state/:stateCode" component={SpecificState} />
    <Route component={NotFound} />
  </Switch>
)

export default App
