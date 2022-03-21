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
    <>
      <Typography.Paragraph>Name: {name}</Typography.Paragraph>
      <Typography.Paragraph>Rental Period: {rentalPeriod}</Typography.Paragraph>
      <Typography.Paragraph>Mileage: {mileage}</Typography.Paragraph>
      <Typography.Paragraph>Repair Needed: {needing_repair}</Typography.Paragraph>
    </>
  )
}

export default ProductDetails
