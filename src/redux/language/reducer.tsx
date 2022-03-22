import { LANGUAGE } from '../../constants/settings'

const initialState = {
  language: LANGUAGE.ENGLISH
}

enum ACTION_TYPES {
  CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'
}

const reducer = (state = initialState, action: { type: ACTION_TYPES; [x: string]: any }) => {
  const { type, value } = action

  switch (type) {
    case ACTION_TYPES.CHANGE_LANGUAGE:
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
