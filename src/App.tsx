import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Routes from './constants/routes'
import Home from './pages/home'
import { createBrowserHistory } from "history";
import useRental from './hooks/useRental'
import DUMMY_DATA from './data/data'
import useLocalStorage from './hooks/useLocalStorage';

const history = createBrowserHistory()

function App() {
  const { loadData }: any = useRental()
  const { setLocalStorage, getLocalStorage } = useLocalStorage()

  React.useEffect(() => {
    const dataLoaded = getLocalStorage({ key: 'rental' })
    if (dataLoaded) {
      loadData({ value: dataLoaded })
    } else {
      setLocalStorage({ key: 'rental', value: DUMMY_DATA })
      loadData({ value: DUMMY_DATA })
    }
  }, [loadData, setLocalStorage, getLocalStorage])

  return (
    <Router history={history}>
      <Switch>
        <Route path={Routes.HOME.path} component={Home} />
      </Switch>
    </Router>
  )
}

export default App
