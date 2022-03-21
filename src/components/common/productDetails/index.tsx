import { Typography } from 'antd'
import get from 'lodash/get'
import * as React from 'react'

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
        <Typography.Paragraph>Name: {name}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>Rental Period: {rentalPeriod}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>Mileage: {mileage}</Typography.Paragraph>
      </div>
      <div>
        <Typography.Paragraph>Repair Needed: {needing_repair}</Typography.Paragraph>
      </div>
    </div>
  )
}

export default ProductDetails
