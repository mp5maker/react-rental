import { Col as AntCol } from 'antd'
import * as React from 'react'

const Col: React.FC<React.ComponentProps<typeof AntCol>> = ({ ...props }: any) => {
  return <AntCol {...props} />
}

export default Col
