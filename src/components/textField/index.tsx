import { Input as AntInput } from 'antd'
import * as React from 'react'

const TextField: React.FC<React.ComponentProps<typeof AntInput>> = ({ ...props }: any) => {
  return <AntInput {...props} />
}

export default TextField
