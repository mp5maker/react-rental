import * as React from 'react'
import './search.scss'

type TSearchProps = React.HTMLAttributes<HTMLInputElement> & {
  value?: string
}

const Search: React.FC<TSearchProps> = ({ ...props }) => {
  return <input {...props} />
}

export default Search
