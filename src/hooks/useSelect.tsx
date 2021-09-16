import * as React from 'react'
import get from 'lodash/get'

const useSelect = (initial: string) => {
  const [selected, setSelected] = React.useState<string>(initial ? initial : '')

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = get(event, 'target.value', '')
    setSelected(value)
  }

  return { handleSelect, selected, setSelected }
}

export default useSelect
