import * as React from 'react'
import reducer, { initialState } from './reducer'

interface ILanguageContextProps {
  state?: any
  dispatch: (props: any) => void
}

const LanguageContext = React.createContext<Partial<ILanguageContextProps>>({})

const LanguageContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <LanguageContext.Provider value={{ state, dispatch }}>
      <>{children}</>
    </LanguageContext.Provider>
  )
}

export default LanguageContextProvider
export { LanguageContext }
