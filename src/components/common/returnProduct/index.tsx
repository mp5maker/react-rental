import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import bookSelect from '../../../utitlities/bookSelect'
import Select from '../../select'
import get from 'lodash/get'
import DatePicker from '../../datepicker'
import './returnProduct.scss'
import Button, { BUTTON_COLOR_TYPE } from '../../button'

interface IReturnProductProps {
  rentals: Array<any>
  onNo?: ((params: any) => void | any)
}

const ReturnProductDetails = ({ item }: any): JSX.Element => {
  const name = get(item, 'name', '')
  const rentalPeriod = get(item, 'minimum_rent_period', '')
  const mileage = get(item, 'mileage', 'N/A')
  const needing_repair = get(item, 'needing_repair', false) ? 'Yes' : 'No'

  return (
    <div>
      <div>
        <p>Name: {name}</p>
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

const ReturnProduct: React.FC<IReturnProductProps> = ({ rentals, onNo }): JSX.Element => {
  const { selected, handleSelect } = useSelect(rentals[0].code)
  const options = bookSelect({ data: rentals, availability: false })
  const [startDate, setStartDate] = React.useState<Date>(new Date())
  const [endDate, setEndDate] = React.useState<Date>(new Date())
  const selectedObj = rentals.find(rental => get(rental, 'code', '') === selected)

  const handleStartDate = (date: Date) => setStartDate(date)
  const handleEndDate = (date: Date) => setEndDate(date)

  const onClickYes = () => {}
  const onClickNo = () => {
    if (onNo) onNo({})
  }

  return (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content'}>
        <Select onChange={handleSelect} value={selected} options={options} />
        <ReturnProductDetails item={selectedObj} />
      </div>
      <div className={'book-footer'}>
        <div className={'from-date'}>
          <div>From: &nbsp;</div>
          <div>
            <DatePicker selected={startDate} onChange={handleStartDate} />
          </div>
        </div>
        <div className={'to-date'}>
          <div>To: &nbsp;</div>
          <div>
            <DatePicker selected={endDate} onChange={handleEndDate} />
          </div>
        </div>
      </div>
      <div className={'yes-no'}>
        <div>
          <Button onClick={onClickYes} color={BUTTON_COLOR_TYPE.success}>
            <p>Yes</p>
          </Button>
        </div>
        <div>
          <Button onClick={onClickNo} color={BUTTON_COLOR_TYPE.error}>
            <p>No</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReturnProduct
