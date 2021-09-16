import * as React from 'react'
import Button, { BUTTON_COLOR_TYPE } from '../button'
import './footer.scss'

interface IFooterProps {
  onBook: (event: React.MouseEvent<HTMLButtonElement>) => void | any
  onReturn: (event: React.MouseEvent<HTMLButtonElement>) => void | any
}

const Footer: React.FC<IFooterProps> = ({ onBook, onReturn }) => {
  return (
    <div className={'footer-container'}>
      <div className={'footer-left'}></div>
      <div className={'footer-right'}>
        <Button
          color={BUTTON_COLOR_TYPE.primary}
          onClick={onBook}
          style={{ width: '100px', marginRight: 'var(--mediumSpace)' }}
        >
          <p style={{ fontWeight: 'bold' }}>Book</p>
        </Button>
        <Button color={BUTTON_COLOR_TYPE.error} onClick={onReturn} style={{ width: '100px' }}>
          <p style={{ fontWeight: 'bold' }}>Return</p>
        </Button>
      </div>
    </div>
  )
}

export default Footer
