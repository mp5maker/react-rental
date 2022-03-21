import * as React from 'react'
import Button from '../button'
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
        <Button onClick={onBook} style={{ marginRight: 'var(--smallSpace)' }}>
          Book
        </Button>
        <Button onClick={onReturn} danger>
          Return
        </Button>
      </div>
    </div>
  )
}

export default Footer
