import { Row as AntRow } from 'antd'
import * as React from 'react'

const Row: React.FC<React.ComponentProps<typeof AntRow>> = ({ ...props }: any) => {
  return <AntRow {...props} />
}

export default Row
