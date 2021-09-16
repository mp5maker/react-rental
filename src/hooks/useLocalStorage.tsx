import * as React from 'react'

const useLocalStorage = () => {
  const setLocalStorage = React.useCallback(({ key, value }: { key: string; value: any }) => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [])

  const getLocalStorage = React.useCallback(({ key }: { key: string }) => {
    const stringifyData = localStorage.getItem(key)
    if (stringifyData) return JSON.parse(stringifyData)
    return null
  }, [])

  return { setLocalStorage, getLocalStorage }
}

export default useLocalStorage
