import get from 'lodash/get'

const bookSelect = ({ data }: { data: Array<any> }) =>
  data.map(item => {
    const name = get(item, 'name', '')
    const code = get(item, 'code', '')
    const label = `${name} / ${code}`
    const value = code
    return {
      label,
      value
    }
  })

export default bookSelect
