import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import { Typography } from 'antd'
import get from 'lodash/get'
import * as React from 'react'
import useLanguage from '../../../hooks/useLanguage'
import Card from '../../card'

interface IProductDetailsProps {
  item: any
}

const ProductDetails: React.FC<IProductDetailsProps> = ({ item }: any): JSX.Element => {
  const { t } = useLanguage()
  const name = get(item, 'name', '')
  const rentalPeriod = get(item, 'minimum_rent_period', '')
  const mileage = get(item, 'mileage', 'N/A') || 'N/A'
  const needing_repair = get(item, 'needing_repair', false) ? <CheckOutlined /> : <CloseOutlined />

  return (
    <Card>
      <Typography.Paragraph>
        {t('NAME')}: {name}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {t('MINIMUM_RENTAL_PERIOD')}: {rentalPeriod}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {t('MILEAGE')}: {mileage}
      </Typography.Paragraph>
      <Typography.Paragraph>
        {t('REPAIR_NEEDED')}: {needing_repair}
      </Typography.Paragraph>
    </Card>
  )
}

export default ProductDetails
