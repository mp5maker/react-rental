import { Input } from 'antd'
import React from 'react'
const { Search: AntSearch } = Input

const Search: React.FC<React.ComponentProps<typeof AntSearch>> = props => {
  return <AntSearch {...props} />
}

export default Search
