import { Table as AntTable } from 'antd'
import * as React from 'react'
import './table.scss'

const Table: React.FC<React.ComponentProps<typeof AntTable>> = ({ ...props }: any) => {
  return <AntTable {...props} />
}

export default Table
