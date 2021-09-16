import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import bookSelect from '../../../utitlities/bookSelect'
import Select from '../../select'
import get from 'lodash/get'
import './book.scss'

interface IBookProps {
  rentals: Array<any>
}

const BookDetails = ({ item }: any): JSX.Element => {
  const name = get(item, 'name', '')
  const rentalPeriod = get(item, 'minimum_rent_period', '')
  const mileage = get(item, 'mileage', 'N/A')
  const needing_repair = get(item, 'needing_repair', false) ? 'Yes' : 'No'

  return (
    <div>
      <div>
        <h4>Name: {name}</h4>
      </div>
      <div>
        <p>Rental Period: {rentalPeriod}</p>
      </div>
      <div>
        <p>Mileage: {mileage}</p>
      </div>
      <div>
        <p>Repair Needed: {needing_repair}</p>
      </div>
    </div>
  )
}

const Book: React.FC<IBookProps> = ({ rentals }): JSX.Element => {
  const { selected, handleSelect } = useSelect(rentals[0].code)
  const options = bookSelect({ data: rentals })
  const selectedObj = rentals.find(rental => get(rental, 'code', '') === selected)

  return (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content'}>
        <Select onChange={handleSelect} value={selected} options={options} />
        <BookDetails item={selectedObj} />
      </div>
    </div>
  )
}

export default Book
