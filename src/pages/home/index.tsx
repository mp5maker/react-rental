import get from 'lodash/get'
import isNil from 'lodash/isNil'
import * as React from 'react'
import Book from '../../components/common/book'
import ReturnProduct from '../../components/common/returnProduct'
import Footer from '../../components/footer'
import Header from '../../components/header'
import Table from '../../components/table'
import { LOCAL_STORAGE_KEY } from '../../constants/settings'
import useLocalStorage from '../../hooks/useLocalStorage'
import useRental from '../../hooks/useRental'
import useSearch from '../../hooks/useSearch'
import durabilityCalculation from '../../utitlities/durabilityCalculation'
import swal from '../../utitlities/swal'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (): JSX.Element => {
  const { rentals, loadData } = useRental()
  const { list, search } = useSearch({ data: rentals })
  const [searchText, setSearchText] = React.useState<string>('')
  const { setLocalStorage } = useLocalStorage()

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(event, 'target.value', '')
    search({
      properties: ['code', 'name', 'type', 'durability', 'mileage'],
      search: value
    })
    setSearchText(value)
  }

  const onBook = () => {
    const onNo = () => swal.clickCancel()
    const onConfirm = ({ item }: any) => {
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
      swal.clickConfirm()
    }

    swal.fire({
      html: <Book rentals={rentals} onNo={onNo} onConfirm={onConfirm} />,
      showConfirmButton: false
    })
  }

  const onReturn = () => {
    const onNo = () => swal.clickCancel()
    const onConfirm = ({ item, usedMileage }: any) => {
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
      swal.clickConfirm()
    }

    swal.fire({
      html: <ReturnProduct rentals={rentals} onNo={onNo} onConfirm={onConfirm} />,
      showConfirmButton: false
    })
  }

  return (
    <div className={'page-container home-container'}>
      <Header onChangeSearch={onChangeSearch} searchText={searchText} />
      <Table
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
                  <p>{availability ? 'Yes' : 'No'}</p>
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
                  <p>{needing_repair ? 'Yes' : 'No'}</p>
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
      <Footer onBook={onBook} onReturn={onReturn} />
    </div>
  )
}

export default Home
