import * as React from 'react'
import './textField.scss'

type TTextFieldProps = React.HTMLAttributes<HTMLInputElement> & {
  value?: string
  type?: string
}

const TextField: React.FC<TTextFieldProps> = ({ ...props }) => {
  return <input {...props} />
}

export default TextField
