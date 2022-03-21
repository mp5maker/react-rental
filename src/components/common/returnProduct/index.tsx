import { Typography } from 'antd'
import get from 'lodash/get'
import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import productSelect from '../../../utitlities/productSelect'
import Button from '../../button'
import Col from '../../col'
import Row from '../../row'
import Select from '../../select'
import Space from '../../space'
import TextField from '../../textField'
import ProductDetails from '../productDetails'

interface IReturnProductProps {
  rentals: Array<any>
  onNo?: (params: any) => void | any
  onConfirm?: (params: any) => void | any
}

enum MODAL_SCREEN {
  DEFAULT = 1,
  CALCULATION = 2
}

const ReturnProduct: React.FC<IReturnProductProps> = ({
  rentals,
  onNo,
  onConfirm
}): JSX.Element => {
  const [screenIndex, setScreenIndex] = React.useState<MODAL_SCREEN>(MODAL_SCREEN.DEFAULT)
  const [usedMileage, setUsedMileage] = React.useState<string>('')
  const [totalPrice, setTotalPrice] = React.useState<number>(0)
  const { selected, handleSelect } = useSelect(
    rentals.filter(item => get(item, 'availability', false) === false)[0].code
  )
  const options = productSelect({ data: rentals, availability: false })
  const selectedObj = rentals.find(rental => get(rental, 'code', '') === selected)
  const price = get(selectedObj, 'price', 0)
  const minimumRentPeriod = get(selectedObj, 'minimum_rent_period', 0)

  const onChangeMileage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(event, 'target.value', 0)
    setTotalPrice(minimumRentPeriod * price)
    setUsedMileage(value)
  }

  const onClickConfirm = () => {
    if (onConfirm) onConfirm({ item: selectedObj, usedMileage, totalPrice })
  }

  const onClickYes = () => {
    if (usedMileage) {
      setScreenIndex(MODAL_SCREEN.CALCULATION)
    }
  }

  const onClickNo = () => {
    if (onNo) onNo({})
  }

  const DefaultScreenContent = (
    <div>
      <Typography.Title level={3}>Return a product</Typography.Title>
      <Select onChange={handleSelect} value={selected} options={options} />
      <Space direction="vertical">&nbsp;</Space>
      <ProductDetails item={selectedObj} />
      <Space direction="vertical">&nbsp;</Space>
      <TextField
        value={usedMileage}
        onChange={onChangeMileage}
        type={'number'}
        placeholder={'Used Mileage'}
      />
      <Space direction="vertical">&nbsp;</Space>
      <Row gutter={16}>
        <Col span={12}>
          <Button onClick={onClickYes} type={'primary'} style={{ width: '100%' }}>
            Yes
          </Button>
        </Col>
        <Col span={12}>
          <Button onClick={onClickNo} danger style={{ width: '100%' }}>
            No
          </Button>
        </Col>
      </Row>
    </div>
  )

  const CalculationScreenContent = (
    <div>
      <div>
        <Typography.Title level={3}>Return a product</Typography.Title>
      </div>
      <div>
        <Typography.Paragraph>Your total price is {totalPrice}</Typography.Paragraph>
        <Typography.Paragraph>Do you want to proceed ?</Typography.Paragraph>
      </div>
      <div>
        <div>
          <Button onClick={onClickConfirm} type={'primary'} style={{ width: '100%' }}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  )

  if (screenIndex === MODAL_SCREEN.DEFAULT) return DefaultScreenContent
  if (screenIndex === MODAL_SCREEN.CALCULATION) return CalculationScreenContent
  return <></>
}

export default ReturnProduct
