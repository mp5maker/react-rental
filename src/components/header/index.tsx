import * as React from 'react'
import Search from '../search'
import './header.scss'
import {Typography} from 'antd'

interface IHeaderProps {
  searchText: string
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void | any
}

const Header: React.FC<IHeaderProps> = ({ searchText, onChangeSearch }): JSX.Element => {
  return (
    <div className={'header-container'}>
      <div className={'header-left'}>
        <Typography.Title>Rental</Typography.Title>
      </div>
      <div className={'header-right'}>
        <Search onChange={onChangeSearch} value={searchText} placeholder={'Search'} />
      </div>
    </div>
  )
}

export default Header
