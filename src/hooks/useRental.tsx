import * as React from 'react'
import { RentalContext } from '../redux/rental/context'
import { ACTION_TYPES } from '../redux/rental/reducer'
import get from 'lodash/get'

const useRental = () => {
  const { state, dispatch }: any = React.useContext(RentalContext)

  const loadData = React.useCallback(({ value }: { value: Array<any> }) => {
    dispatch({
      type: ACTION_TYPES.INITIAL,
      value
    })
  }, [dispatch])

  return { state, dispatch, loadData, rentals: get(state, 'data', []) }
}

export default useRental
