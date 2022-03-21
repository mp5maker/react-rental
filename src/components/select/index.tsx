import { Select as AntSelect } from 'antd'
import get from 'lodash/get'
import * as React from 'react'

const Select: React.FC<
  React.ComponentProps<typeof AntSelect> & { options: Array<{ value: string; label: string }> }
> = ({ value, onChange, options }): JSX.Element => {
  return (
    <AntSelect value={value} onChange={onChange} style={{ width: '100%' }}>
      {options.map(option => {
        return (
          <AntSelect.Option key={get(option, 'value', '')}>
            {get(option, 'label', '')}
          </AntSelect.Option>
        )
      })}
    </AntSelect>
  )
}

export default Select
