import * as React from 'react'
import Header from '../../components/header'
import Table from '../../components/table'
import useRental from '../../hooks/useRental'
import isNil from 'lodash/isNil'

interface IHomeProps {}

const Home: React.FC<IHomeProps> = (): JSX.Element => {
  const { rentals } = useRental()

  return (
    <div className={'page-container home-container'}>
      <Header />
      <Table
        data={rentals}
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
    </div>
  )
}

export default Home
