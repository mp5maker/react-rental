import { Typography } from 'antd'
import differenceInDays from 'date-fns/differenceInDays'
import format from 'date-fns/format'
import get from 'lodash/get'
import * as React from 'react'
import { Trans } from 'react-i18next'
import useLanguage from '../../../hooks/useLanguage'
import useSelect from '../../../hooks/useSelect'
import productSelect from '../../../utitlities/productSelect'
import Button from '../../button'
import Col from '../../col'
import DatePicker from '../../datepicker'
import Row from '../../row'
import Select from '../../select'
import Space from '../../space'
import ProductDetails from '../productDetails'

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
  const { t } = useLanguage()

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
      <Typography.Title level={3}>Book a product</Typography.Title>
      <Space direction="vertical">&nbsp;</Space>
      <Select onChange={handleSelect} value={selected} options={options} />
      <Space direction="vertical">&nbsp;</Space>
      <ProductDetails item={selectedObj} />
      <Space direction="vertical">&nbsp;</Space>
      <Typography.Title level={5}>Date Range</Typography.Title>
      <Row>
        <Col>
          <DatePicker selected={startDate} onChange={handleStartDate} />
        </Col>
        <Col>
          <DatePicker selected={endDate} onChange={handleEndDate} />
        </Col>
      </Row>
      <Typography.Paragraph className={'error-text'}>{error}</Typography.Paragraph>
      <Row gutter={16}>
        <Col span={12}>
          <Button onClick={onClickYes} type={'primary'} style={{ width: '100%' }}>
            {t('YES')}
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={onClickNo} danger style={{ width: '100%' }}>
            {t('NO')}
          </Button>
        </Col>
      </Row>
    </div>
  )

  const CalculationScreenContent = (
    <div>
      <div>
        <h3>{t('BOOK_A_PRODUCT')}</h3>
      </div>
      <div>
        <Typography.Paragraph>
          <Trans i18nKey={'___YOUR_ESTIMATED_PRICE_IS___'} values={{ price: estimatedPrice }} />
        </Typography.Paragraph>
        <Typography.Paragraph>{t('DO_YOU_WANT_TO_PROCEED')}</Typography.Paragraph>
      </div>
      <div>
        <div>
          <Button onClick={onClickConfirm}>{t('CONFIRM')}</Button>
        </div>
      </div>
    </div>
  )

  if (screenIndex === MODAL_SCREEN.DEFAULT) return DefaultScreenContent
  if (screenIndex === MODAL_SCREEN.CALCULATION) return CalculationScreenContent
  return <></>
}

export default Book
