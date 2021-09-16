import * as React from 'react'
import Header from '../../components/header'
import Table from '../../components/table'
import useRental from '../../hooks/useRental'
import isNil from 'lodash/isNil'
import Footer from '../../components/footer'
import swal from '../../utitlities/swal'
import get from 'lodash/get'
import useSearch from '../../hooks/useSearch'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (): JSX.Element => {
  const { rentals } = useRental()
  const { list, search } = useSearch({ data: rentals })
  const [searchText, setSearchText] = React.useState<string>('')

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = get(event, 'target.value', '')
    search({
      properties: ['code', 'name', 'type', 'durability', 'mileage'],
      search: value
    })
    setSearchText(value)
  }

  const onBook = () => {
    swal.fire({
      html: <div>Book in progress</div>
    })
  }

  const onReturn = () => {
    swal.fire({
      html: <div>Return in progress</div>
    })
  }

  return (
    <div className={'page-container home-container'}>
      <Header onChangeSearch={onChangeSearch} searchText={searchText} />
      <Table
        data={list}
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
