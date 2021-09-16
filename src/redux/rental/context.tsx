import * as React from 'react'
import reducer, { initialState } from './reducer'

interface IRentalContextProps {
  state?: any
  dispatch: (props: any) => void
}

const RentalContext = React.createContext<Partial<IRentalContextProps>>({})

const RentalContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <RentalContext.Provider value={{ state, dispatch }}>
      <>{children}</>
    </RentalContext.Provider>
  )
}

export default RentalContextProvider
export { RentalContext }
