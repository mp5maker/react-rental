import get from 'lodash/get'
import * as React from 'react'
import useSelect from '../../../hooks/useSelect'
import bookSelect from '../../../utitlities/bookSelect'
import Button, { BUTTON_COLOR_TYPE } from '../../button'
import Select from '../../select'
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
  const { selected, handleSelect } = useSelect(
    rentals.filter(item => get(item, 'availability', false) === false)[0].code
  )
  const options = bookSelect({ data: rentals, availability: false })
  const selectedObj = rentals.find(rental => get(rental, 'code', '') === selected)

  const onClickConfirm = () => {
    if (onConfirm) onConfirm({ item: selectedObj })
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
      <div className={'book-footer'}></div>
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
        <p>Your estimated price is $</p>
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
