import productSelect from '.'

const data = [
  {
    code: 'p1',
    name: 'Air Compressor 12 GAS',
    type: 'plain',
    availability: true,
    needing_repair: false,
    durability: 3000,
    max_durability: 3000,
    mileage: null,
    price: 4500,
    minimum_rent_period: 1
  },
  {
    code: 'm2',
    name: 'Boom lift 60',
    type: 'meter',
    availability: true,
    needing_repair: false,
    durability: 8000,
    max_durability: 10000,
    mileage: 5000,
    price: 1500,
    minimum_rent_period: 4
  },
  {
    code: 'm3',
    name: 'Boom lift 80',
    type: 'meter',
    availability: false,
    needing_repair: true,
    durability: 500,
    max_durability: 12000,
    mileage: 200,
    price: 2000,
    minimum_rent_period: 2
  }
]

const notAvailable = [
  {
    label: 'Boom lift 80 / m3',
    value: 'm3'
  }
]

const available = [
  {
    label: 'Air Compressor 12 GAS / p1',
    value: 'p1'
  },
  {
    label: 'Boom lift 60 / m2',
    value: 'm2'
  }
]

describe('Check the function of the productSelect', () => {
  it('should show list of [not available] list', () => {
    const list = productSelect({ data, availability: false })
    expect(list).toEqual(notAvailable)
  })
  it('should show list of [available] list', () => {
    const list = productSelect({ data, availability: true })
    expect(list).toEqual(available)
  })
})
