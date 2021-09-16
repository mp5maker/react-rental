import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import bookSelect from '../../../utitlities/bookSelect'
import Select from '../../select'
import './book.scss'

interface IBookProps {
  rentals: Array<any>
}

const Book: React.FC<IBookProps> = ({ rentals }): JSX.Element => {
  const { selected, handleSelect } = useSelect()
  const options = bookSelect({ data: rentals })

  return (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content'}>
        <Select onChange={handleSelect} value={selected} options={options} />
      </div>
    </div>
  )
}

export default Book
