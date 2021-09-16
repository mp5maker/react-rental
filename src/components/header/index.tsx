import * as React from 'react'
import './header.scss'

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = (): JSX.Element => {
  return (
    <div className={'header-container'}>
      <div className={'header-left'}>
        <h2>Rental</h2>
      </div>
      <div className={'header-right'}>Right</div>
    </div>
  )
}

export default Header
