import * as React from 'react'
import TextField from '../textField'
import './header.scss'

interface IHeaderProps {
  searchText: string
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void | any
}

const Header: React.FC<IHeaderProps> = ({ searchText, onChangeSearch }): JSX.Element => {
  return (
    <div className={'header-container'}>
      <div className={'header-left'}>
        <h2>Rental</h2>
      </div>
      <div className={'header-right'}>
        <TextField onChange={onChangeSearch} value={searchText} placeholder={'Search'} />
      </div>
    </div>
  )
}

export default Header
