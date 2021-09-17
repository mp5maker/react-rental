import get from 'lodash/get'

const productSelect = ({ data, availability = true }: { data: Array<any>, availability?: boolean }) =>
  data.filter((item) => get(item, 'availability', false) === availability).map(item => {
    const name = get(item, 'name', '')
    const code = get(item, 'code', '')
    const label = `${name} / ${code}`
    const value = code
    return {
      label,
      value
    }
  })

export default productSelect