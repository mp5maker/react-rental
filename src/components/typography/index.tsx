import { Typography as AntTypography } from 'antd'
import * as React from 'react'

const Typography: React.FC<React.ComponentProps<typeof AntTypography>> = ({ ...props }: any) => {
  return <AntTypography {...props} />
}

export default Typography
