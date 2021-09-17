import get from 'lodash/get'
import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import productSelect from '../../../utitlities/productSelect'
import Button, { BUTTON_COLOR_TYPE } from '../../button'
import Select from '../../select'
import TextField from '../../textField'
import ProductDetails from '../productDetails'
import './returnProduct.scss'

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

  const onChangeMileage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(event, 'target.value', 0)
    setTotalPrice(Math.ceil(parseInt(value, 10) / 10) * price)
    setUsedMileage(value)
  }

  const onClickConfirm = () => {
    if (onConfirm) onConfirm({ item: selectedObj, usedMileage, totalPrice })
  }

  const onClickYes = () => {
    setScreenIndex(MODAL_SCREEN.CALCULATION)
  }

  const onClickNo = () => {
    if (onNo) onNo({})
  }

  const DefaultScreenContent = (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content'}>
        <Select onChange={handleSelect} value={selected} options={options} />
        <ProductDetails item={selectedObj} />
      </div>
      <div className={'book-footer'}>
        <TextField
          value={usedMileage}
          onChange={onChangeMileage}
          type={'number'}
          placeholder={'Used Mileage'}
        />
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

  const CalculationScreenContent = (
    <div className={'book-container'}>
      <div className={'book-title'}>
        <h3>Book a product</h3>
      </div>
      <div className={'book-content'}>
        <p>Your estimated price is ${totalPrice}</p>
      </div>
      <div className={'yes-no'}>
        <div>
          <Button onClick={onClickConfirm} color={BUTTON_COLOR_TYPE.success}>
            <p>Confirm</p>
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
