import { Space as AntSpace } from 'antd'
import * as React from 'react'

const Space: React.FC<React.ComponentProps<typeof AntSpace>> = ({ ...props }: any) => {
  return <AntSpace {...props} />
}

export default Space
