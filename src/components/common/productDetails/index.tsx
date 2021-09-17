import * as React from 'react'
import get from 'lodash/get'

interface IProductDetailsProps {
  item: any
}

const ProductDetails: React.FC<IProductDetailsProps> = ({ item }: any): JSX.Element => {
  const name = get(item, 'name', '')
  const rentalPeriod = get(item, 'minimum_rent_period', '')
  const mileage = get(item, 'mileage', 'N/A') || 'N/A'
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

export default ProductDetails