import * as React from 'react'
import { v4 } from 'uuid'
import idGenerator from '../../utitlities/idGenerator'
import get from 'lodash/get'
import './select.scss'

type TSelectProps = React.HTMLAttributes<HTMLSelectElement> & {
  options: Array<any>
  value: any
}
const generatedUUID = v4()
const generator = idGenerator()

const Select: React.FC<TSelectProps> = ({ value, onChange, options }): JSX.Element => {
  return (
    <div className={'select-container'}>
      <select value={value} onChange={onChange}>
        {options.map((option, key) => {
          return (
            <option
              key={`${generatedUUID}-${generator.next().value}-${key}`}
              value={get(option, 'value', '')}
            >
              {get(option, 'label', '')}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
