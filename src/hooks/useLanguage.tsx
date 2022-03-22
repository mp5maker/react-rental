import get from 'lodash/get'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGE } from '../constants/settings'
import { LanguageContext } from '../redux/language/context'
import { ACTION_TYPES } from '../redux/language/reducer'

const useLanguage = () => {
  const { t, i18n } = useTranslation()
  const { state, dispatch }: any = React.useContext(LanguageContext)
  const currentLanguage = get(state, 'language', LANGUAGE.ENGLISH)

  const changeLanguage = (value: LANGUAGE) => {
    dispatch({ type: ACTION_TYPES.CHANGE_LANGUAGE, value })
  }

  return { changeLanguage, t, i18n, state, dispatch, currentLanguage }
}

export default useLanguage
