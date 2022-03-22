import BookOutlined from '@ant-design/icons/BookOutlined'
import RollbackOutlined from '@ant-design/icons/RollbackOutlined'
import { Typography } from 'antd'
import * as React from 'react'
import Button from '../button'
import Search from '../search'
import './header.scss'

interface IHeaderProps {
  searchText: string
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void | any
  onBook: (event: React.MouseEvent<HTMLButtonElement>) => void | any
  onReturn: (event: React.MouseEvent<HTMLButtonElement>) => void | any
}

const Header: React.FC<IHeaderProps> = ({
  searchText,
  onChangeSearch,
  onBook,
  onReturn
}): JSX.Element => {
  return (
    <div className={'header-container'}>
      <div className={'header-left'}>
        <Typography.Title>Rental</Typography.Title>
      </div>
      <div className={'header-right'}>
        <Button onClick={onBook} style={{ marginRight: 'var(--smallSpace)' }}>
          <BookOutlined />
        </Button>
        <Button onClick={onReturn} style={{ marginRight: 'var(--smallSpace)' }}>
          <RollbackOutlined />
        </Button>
        <Search
          onChange={onChangeSearch}
          value={searchText}
          placeholder={'Search'}
          style={{ marginRight: 'var(--smallSpace)' }}
        />
      </div>
    </div>
  )
}

export default Header
