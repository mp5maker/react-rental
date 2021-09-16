import * as React from 'react'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type TDatePickerProps = Partial<React.ComponentProps<typeof ReactDatePicker>> & {}

const DatePicker: React.FC<TDatePickerProps> = ({ ...props }: any) => {
  return <ReactDatePicker {...props} />
}

export default DatePicker