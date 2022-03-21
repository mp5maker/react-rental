import { Drawer as AntDrawer } from 'antd'
import * as React from 'react'

const Drawer: React.FC<React.ComponentProps<typeof AntDrawer>> = ({ ...props }: any) => {
  return <AntDrawer {...props} />
}

export default Drawer
