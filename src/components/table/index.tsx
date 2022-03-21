import { Table as AntTable } from 'antd'
import * as React from 'react'

const Table: React.FC<React.ComponentProps<typeof AntTable>> = ({ ...props }: any) => {
  return <AntTable {...props} />
}

export default Table
