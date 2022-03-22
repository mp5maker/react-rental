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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>{t('NAME')}</Typography.Paragraph>
        <Typography.Paragraph>{name}</Typography.Paragraph>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>
          {t('__MINIMUM_RENTAL_PERIOD__')}
        </Typography.Paragraph>
        <Typography.Paragraph>{rentalPeriod}</Typography.Paragraph>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>{t('MILEAGE')}</Typography.Paragraph>
        <Typography.Paragraph>{mileage}</Typography.Paragraph>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography.Paragraph style={{ fontWeight: 'bold' }}>
          {t('REPAIR_NEEDED')}
        </Typography.Paragraph>
        <Typography.Paragraph>{needing_repair}</Typography.Paragraph>
      </div>
    </Card>
  )
}

export default ProductDetails
