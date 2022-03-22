import CheckOutlined from '@ant-design/icons/CheckOutlined'
import CloseOutlined from '@ant-design/icons/CloseOutlined'
import { Typography } from 'antd'
import format from 'date-fns/format'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import omit from 'lodash/omit'
import pick from 'lodash/pick'
import * as React from 'react'
import Book from '../../components/common/book'
import ReturnProduct from '../../components/common/returnProduct'
import Drawer from '../../components/drawer'
import Header from '../../components/header'
import Table from '../../components/table'
import { DATE_FNS_FORMAT, LOCAL_STORAGE_KEY } from '../../constants/settings'
import useLanguage from '../../hooks/useLanguage'
import useLocalStorage from '../../hooks/useLocalStorage'
import useMediaQuery from '../../hooks/useMediaQuery'
import useRental from '../../hooks/useRental'
import useSearch from '../../hooks/useSearch'
import durabilityCalculation from '../../utitlities/durabilityCalculation'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (): JSX.Element => {
  const { rentals, loadData } = useRental()
  const { t } = useLanguage()
  const { list, search } = useSearch({ data: rentals })
  const [searchText, setSearchText] = React.useState<string>('')
  const { setLocalStorage } = useLocalStorage()
  const [showReturnProduct, setShowReturnProduct] = React.useState<boolean>(false)
  const [showBookProduct, setShowBookProduct] = React.useState<boolean>(false)
  const matches = useMediaQuery('(max-width: 767px)')

  const closeReturnProduct = React.useCallback(() => setShowReturnProduct(false), [])
  const openReturnProduct = React.useCallback(() => setShowReturnProduct(true), [])
  const closeBookProduct = React.useCallback(() => setShowBookProduct(false), [])
  const openBookProduct = React.useCallback(() => setShowBookProduct(true), [])

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(event, 'target.value', '')
    search({
      properties: ['code', 'name', 'type', 'durability', 'mileage'],
      search: value
    })
    setSearchText(value)
  }

  const onConfirmBookProduct = ({
    item,
    estimatedPrice,
    startDate,
    endDate,
    differenceDate
  }: any) => {
    const itemCode = get(item, 'code', '')
    const modifiedRentals = rentals.map((rental: any) => {
      const rentalCode = get(rental, 'code', '')
      if (rentalCode === itemCode) {
        return {
          ...rental,
          availability: false,
          estimatedPrice,
          startDate,
          endDate,
          differenceDate
        }
      }
      return rental
    })
    setLocalStorage({ key: LOCAL_STORAGE_KEY.RENTAL, value: modifiedRentals })
    loadData({ value: modifiedRentals })
    closeBookProduct()
  }

  const onConfirmReturnProduct = ({ item, usedMileage }: any) => {
    const itemCode = get(item, 'code', '')
    const modifiedRentals = rentals.map((rental: any) => {
      const rentalCode = get(rental, 'code', '')
      if (rentalCode === itemCode) {
        const durability = durabilityCalculation({ item, miles: usedMileage })
        const mileage = isNil(get(item, 'mileage', 0)) ? 0 : get(item, 'mileage', 0)
        return {
          ...omit(rental, 'estimatedPrice', 'startDate', 'endDate', 'differenceDate'),
          availability: true,
          durability,
          mileage: mileage + Number(usedMileage)
        }
      }
      return rental
    })
    setLocalStorage({ key: LOCAL_STORAGE_KEY.RENTAL, value: modifiedRentals })
    loadData({ value: modifiedRentals })
    closeReturnProduct()
  }

  const ReturnProductDrawerContent = (
    <Drawer
      title={t('RETURN_A_PRODUCT')}
      placement={'right'}
      onClose={closeReturnProduct}
      visible={showReturnProduct}
      key={'return-product-right'}
    >
      {showReturnProduct ? (
        <ReturnProduct
          rentals={rentals}
          onNo={closeReturnProduct}
          onConfirm={onConfirmReturnProduct}
        />
      ) : (
        <></>
      )}
    </Drawer>
  )

  const BookProductDrawerContent = (
    <Drawer
      title={t('BOOK_A_PRODUCT')}
      placement={'right'}
      onClose={closeBookProduct}
      visible={showBookProduct}
      key={'book-product-right'}
    >
      {showBookProduct ? (
        <Book rentals={rentals} onNo={closeBookProduct} onConfirm={onConfirmBookProduct} />
      ) : (
        <></>
      )}
    </Drawer>
  )

  return (
    <>
      {ReturnProductDrawerContent}
      {BookProductDrawerContent}
      <div className={'page-container home-container'}>
        <Header
          onChangeSearch={onChangeSearch}
          searchText={searchText}
          onBook={openBookProduct}
          onReturn={openReturnProduct}
        />
        <Table
          pagination={false}
          className={'table-container'}
          sticky={true}
          dataSource={list.map((item, index) => {
            const picked = pick(item, 'estimatedPrice', 'startDate', 'endDate', 'differenceDate')
            const startDate = get(picked, 'startDate', new Date())
            const endDate = get(picked, 'endDate', new Date())
            const differenceDate = get(picked, 'differenceDate', '')
            const estimatedPrice = get(picked, 'estimatedPrice', '')
            return {
              ...item,
              key: index + 1,
              ...(estimatedPrice
                ? {
                    children: [
                      {
                        key: `${index}-1`,
                        name: `${t('START_DATE')}: ${format(
                          new Date(startDate),
                          DATE_FNS_FORMAT.DATE
                        )}`,
                        code: `${t('END_DATE')}: ${format(
                          new Date(endDate),
                          DATE_FNS_FORMAT.DATE
                        )}`,
                        durability: `${t('BOOKED_FOR')}: ${differenceDate} ${t('DAY(S)')}`,
                        mileage: `${t('ESTIMATED_PRICE')}: ${estimatedPrice}`
                      }
                    ]
                  }
                : {})
            }
          })}
          columns={[
            {
              title: t('NAME'),
              dataIndex: 'name',
              key: 'name',
              render: name => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? <Typography.Paragraph>{t('NAME')}</Typography.Paragraph> : <></>}
                    <Typography.Paragraph>{name}</Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: t('CODE'),
              dataIndex: 'code',
              key: 'code',
              render: code => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? <Typography.Paragraph>{t('CODE')}</Typography.Paragraph> : <></>}
                    <Typography.Paragraph>{code}</Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: t('AVAILABILITY'),
              dataIndex: 'availability',
              key: 'availability',
              render: availability => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? (
                      <Typography.Paragraph>{t('AVAILABILITY')}</Typography.Paragraph>
                    ) : (
                      <></>
                    )}
                    <Typography.Paragraph>
                      {availability ? <CheckOutlined /> : <CloseOutlined />}
                    </Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: t('NEEDING_REPAIR'),
              dataIndex: 'needing_repair',
              key: 'needing_repair',
              render: needing_repair => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? (
                      <Typography.Paragraph>{t('NEEDING_REPAIR')}</Typography.Paragraph>
                    ) : (
                      <></>
                    )}
                    <Typography.Paragraph>
                      {needing_repair ? <CheckOutlined /> : <CloseOutlined />}
                    </Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: t('DURABILITY'),
              dataIndex: 'durability',
              key: 'durability',
              render: durability => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? (
                      <Typography.Paragraph>{t('DURABILITY')}</Typography.Paragraph>
                    ) : (
                      <></>
                    )}
                    <Typography.Paragraph>{durability}</Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: t('MILEAGE'),
              dataIndex: 'mileage',
              key: 'mileage',
              render: mileage => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      ...(matches
                        ? {
                            alignItems: 'center'
                          }
                        : {})
                    }}
                  >
                    {matches ? <Typography.Paragraph>{t('MILEAGE')}</Typography.Paragraph> : <></>}
                    <Typography.Paragraph>
                      {mileage || t('__NOT_APPLICABLE__')}
                    </Typography.Paragraph>
                  </div>
                )
              }
            }
          ]}
        />
      </div>
    </>
  )
}

export default Home
