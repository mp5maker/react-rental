import * as React from 'react'
import Header from '../../components/header'
import Table from '../../components/table'
import useRental from '../../hooks/useRental'
import isNil from 'lodash/isNil'
import Footer from '../../components/footer'
import swal from '../../utitlities/swal'
import get from 'lodash/get'
import useSearch from '../../hooks/useSearch'
import Book from '../../components/common/book'
import ReturnProduct from '../../components/common/returnProduct'
import useLocalStorage from '../../hooks/useLocalStorage'
import durabilityCalculation from '../../utitlities/durabilityCalculation'
import { LOCAL_STORAGE_KEY } from '../../constants/settings'
import NoDataFound from '../../components/noDataFound'

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
        data={list}
        noDataComponent={<NoDataFound />}
        properties={['name', 'code', 'availability', 'needing_repair', 'durability', 'mileage']}
        headerTitles={{
          name: 'Name',
          code: 'Code',
          availability: 'Availability',
          needing_repair: 'Need To Repair',
          durability: 'Durability',
          mileage: 'Mileage'
        }}
        columnSpacing={{
          id: '10%',
          name: '30%',
          code: '10%',
          availability: '10%',
          needing_repair: '10%',
          durability: '10%',
          mileage: '20%'
        }}
        customBody={({ row, column }) => {
          if (['availability', 'needing_repair'].includes(column)) {
            return (
              <div>
                <p>{row[column] ? 'Yes' : 'No'}</p>
              </div>
            )
          }
          return (
            <div>
              <p>{isNil(row[column]) ? 'N/A' : row[column]}</p>
            </div>
          )
        }}
      />
      <Footer onBook={onBook} onReturn={onReturn} />
    </div>
  )
}

export default Home
