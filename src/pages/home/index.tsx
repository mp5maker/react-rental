import { Typography } from 'antd'
import get from 'lodash/get'
import isNil from 'lodash/isNil'
import * as React from 'react'
import Book from '../../components/common/book'
import ReturnProduct from '../../components/common/returnProduct'
import Drawer from '../../components/drawer'
import Header from '../../components/header'
import Table from '../../components/table'
import { LOCAL_STORAGE_KEY } from '../../constants/settings'
import useLocalStorage from '../../hooks/useLocalStorage'
import useRental from '../../hooks/useRental'
import useSearch from '../../hooks/useSearch'
import durabilityCalculation from '../../utitlities/durabilityCalculation'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (): JSX.Element => {
  const { rentals, loadData } = useRental()
  const { list, search } = useSearch({ data: rentals })
  const [searchText, setSearchText] = React.useState<string>('')
  const { setLocalStorage } = useLocalStorage()
  const [showReturnProduct, setShowReturnProduct] = React.useState<boolean>(false)
  const [showBookProduct, setShowBookProduct] = React.useState<boolean>(false)

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

  const onConfirmBookProduct = ({ item }: any) => {
    const itemCode = get(item, 'code', '')
    const modifiedRentals = rentals.map((rental: any) => {
      const rentalCode = get(rental, 'code', '')
      if (rentalCode === itemCode) {
        return {
          ...rental,
          availability: false
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
          ...rental,
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
      title={'Return a Product'}
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
      title={'Book a Product'}
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
          className={'table-container'}
          dataSource={list.map((item, index) => ({ ...item, key: index + 1 }))}
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Code',
              dataIndex: 'code',
              key: 'code'
            },
            {
              title: 'Availability',
              dataIndex: 'availability',
              key: 'availability',
              render: availability => {
                return (
                  <div>
                    <Typography.Paragraph>{availability ? 'Yes' : 'No'}</Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name'
            },
            {
              title: 'Needing Repair',
              dataIndex: 'needing_repair',
              key: 'needing_repair',
              render: needing_repair => {
                return (
                  <div>
                    <Typography.Paragraph>{needing_repair ? 'Yes' : 'No'}</Typography.Paragraph>
                  </div>
                )
              }
            },
            {
              title: 'Durability',
              dataIndex: 'durability',
              key: 'durability'
            },
            {
              title: 'Mileage',
              dataIndex: 'mileage',
              key: 'mileage'
            }
          ]}
        />
      </div>
    </>
  )
}

export default Home
