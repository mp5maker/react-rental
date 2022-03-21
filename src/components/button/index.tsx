import { Button as AntButton } from 'antd'
import * as React from 'react'

const Button: React.FC<React.ComponentProps<typeof AntButton>> = ({ ...props }): JSX.Element => {
  return <AntButton {...props} />
}

export default Button
