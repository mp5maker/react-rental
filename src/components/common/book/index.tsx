import { Typography } from 'antd'
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import get from 'lodash/get'
import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import productSelect from '../../../utitlities/productSelect'
import Button from '../../button'
import DatePicker from '../../datepicker'
import Select from '../../select'
import ProductDetails from '../productDetails'
import './book.scss'

interface IBookProps {
  rentals: Array<any>
  onNo?: (params: any) => void | any
  onConfirm?: (params: any) => void | any
}

enum MODAL_SCREEN {
  DEFAULT = 1,
  CALCULATION = 2
}

const Book: React.FC<IBookProps> = ({ rentals, onNo, onConfirm }): JSX.Element => {
  const [screenIndex, setScreenIndex] = React.useState<MODAL_SCREEN>(MODAL_SCREEN.DEFAULT)
  const { selected, handleSelect } = useSelect(
    rentals.filter(item => get(item, 'availability', false) === true)[0].code
  )
  const options = productSelect({ data: rentals, availability: true })
  const [startDate, setStartDate] = React.useState<Date>(new Date())
  const [endDate, setEndDate] = React.useState<Date>(new Date())
  const selectedObj = rentals.find(rental => get(rental, 'code', '') === selected)
  const rentalPeriod = get(selectedObj, 'minimum_rent_period', 0)
  const price = get(selectedObj, 'price', 0)
  const [estimatedPrice, setEstimatedPrice] = React.useState<number>(0)
  const [error, setError] = React.useState<string>('')

  const handleStartDate = (date: Date) => {
    setError('')
    setStartDate(date)
  }
  const handleEndDate = (date: Date) => {
    setError('')
    setEndDate(date)
  }
  const differenceDate =
    differenceInDays(endDate, startDate) +
    (format(startDate, 'yyyyMMdd') === format(endDate, 'yyyyMMdd') ? 0 : 1)
  const isValidDifferenceDate = differenceDate >= rentalPeriod

  const onClickConfirm = () => {
    if (onConfirm) onConfirm({ item: selectedObj, estimatedPrice, differenceDate })
  }

  const onClickYes = () => {
    if (isValidDifferenceDate) {
      setEstimatedPrice(differenceDate * price)
      setScreenIndex(MODAL_SCREEN.CALCULATION)
    } else {
      setError(`The rental period needs to be at least ${rentalPeriod} day`)
    }
  }

  const onClickNo = () => {
    if (onNo) onNo({})
  }

  const DefaultScreenContent = (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <Typography.Title level={3}>Book a product</Typography.Title>
      </div>
      <div className={'book-content'}>
        <Select onChange={handleSelect} value={selected} options={options} />
        <ProductDetails item={selectedObj} />
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
      <div className={'book-content'}>
        <Typography.Paragraph className={'error-text'}>{error}</Typography.Paragraph>
      </div>
      <div className={'yes-no'}>
        <div>
          <Button onClick={onClickYes} type={'primary'}>
            Yes
          </Button>
        </div>
        <div>
          <Button onClick={onClickNo} type={'primary'} danger>
            No
          </Button>
        </div>
      </div>
    </div>
  )

  const CalculationScreenContent = (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content-alt'}>
        <Typography.Paragraph>Your estimated price is ${estimatedPrice}</Typography.Paragraph>
        <Typography.Paragraph>Do you want to proceed ?</Typography.Paragraph>
      </div>
      <div className={'yes-no'}>
        <div>
          <Button onClick={onClickConfirm}>Confirm</Button>
        </div>
      </div>
    </div>
  )

  if (screenIndex === MODAL_SCREEN.DEFAULT) return DefaultScreenContent
  if (screenIndex === MODAL_SCREEN.CALCULATION) return CalculationScreenContent
  return <></>
}

export default Book
