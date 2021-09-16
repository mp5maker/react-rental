import * as React from 'react'
import get from 'lodash/get'

const useSelect = () => {
  const [selected, setSelected] = React.useState<string>('')

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = get(event, 'target.value', '')
    setSelected(value)
  }

  return { handleSelect, selected, setSelected }
}

export default useSelect
