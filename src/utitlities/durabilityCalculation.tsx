import get from 'lodash/get'

export enum DURABILITY_TYPE {
  PLAIN = 'plain',
  METER = 'meter'
}

const durabilityCalculation = ({ miles, item }: any) => {
  const type = get(item, 'type', '')
  const days = Math.ceil(miles / 10)
  const currentDurability = get(item, 'durability', 0)
  const minimumRentPeriod = get(item, 'minimum_rent_period', 0)

  if (type === DURABILITY_TYPE.PLAIN) {
    const newDurability = currentDurability - minimumRentPeriod
    return Math.sign(newDurability) === -1 ? 0 : newDurability
  }

  if (type === DURABILITY_TYPE.METER) {
    const newDurability = currentDurability - minimumRentPeriod * 2 - days * 2
    return Math.sign(newDurability) === -1 ? 0 : newDurability
  }

  return 0
}

export default durabilityCalculation
