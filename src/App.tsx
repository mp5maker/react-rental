import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Routes from './constants/routes'
import Home from './pages/home'
import { createBrowserHistory } from "history";
import useRental from './hooks/useRental'
import DUMMY_DATA from './data/data'

const history = createBrowserHistory()

function App() {
  const { loadData }: any = useRental()

  React.useEffect(() => {
    loadData({ value: DUMMY_DATA })
  }, [loadData])

  return (
    <Router history={history}>
      <Switch>
        <Route path={Routes.HOME.path} component={Home} />
      </Switch>
    </Router>
  )
}

export default App
