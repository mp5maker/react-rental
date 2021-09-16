import * as React from 'react'
import { RentalContext } from '../redux/rental/context'

const useRental = () => {
  const { state, dispatch } = React.useContext(RentalContext)
  return { state, dispatch }
}

export default useRental