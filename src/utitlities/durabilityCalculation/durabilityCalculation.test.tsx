import durabilityCalculation from '.'

const plainType = {
  code: 'p2',
  name: 'Air Compressor 5 Electric',
  type: 'plain',
  availability: true,
  needing_repair: false,
  durability: 1500,
  max_durability: 2000,
  mileage: null,
  price: 6500,
  minimum_rent_period: 1
}

const meterType = {
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

describe('Check the function of the durabilityCalculation', () => {
  it('should calculate durability properly for type [meter]', () => {
    const durability = durabilityCalculation({ item: meterType, miles: 20 })
    expect(durability).toBe(492)
  })
  it('should calculate durability properly for type [plain]', () => {
    const durability = durabilityCalculation({ item: plainType, miles: 20 })
    expect(durability).toBe(plainType.durability - plainType.minimum_rent_period)
  })
})
