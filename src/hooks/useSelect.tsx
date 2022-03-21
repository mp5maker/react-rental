import * as React from 'react'

const useSelect = (initial: string) => {
  const [selected, setSelected] = React.useState<string>(initial ? initial : '')

  const handleSelect = React.useCallback(value => setSelected(value), [])

  return { handleSelect, selected, setSelected }
}

export default useSelect
