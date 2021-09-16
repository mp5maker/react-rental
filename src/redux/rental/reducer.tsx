const initialState = {
  data: [],
  filteredData: []
}

enum ACTION_TYPES {
  'INITIAL' = 'INITIAL'
}

const reducer = (
  state = initialState,
  action: { type: ACTION_TYPES.INITIAL; [x: string]: any }
) => {
  const { type, value } = action

  switch (type) {
    case ACTION_TYPES.INITIAL:
      return {
        ...state,
        data: value
      }
    default:
      return state
  }
}

export { ACTION_TYPES, initialState }
export default reducer
