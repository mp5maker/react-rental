import * as React from 'react'
import get from 'lodash/get'

const useSearch = ({ data }: { data: Array<any> }) => {
  const [list, setList] = React.useState<Array<any>>([])

  const search = React.useCallback(
    ({
      properties,
      search,
      isExact = false
    }: {
      properties: Array<string>
      search: string
      isExact?: boolean
    }) => {
      if (search) {
        const filteredResult = list.filter(item => {
          return properties.some((prop: string) => {
            const str = String(get(item, prop, ''))
            return isExact ? str === search : str.toLowerCase().includes(search.toLowerCase())
          })
        })
        return setList(filteredResult)
      } else return setList(data)
    },
    [list, data]
  )

  React.useEffect(() => {
    setList(data)
  }, [data])

  return { list, setList, search }
}

export default useSearch
