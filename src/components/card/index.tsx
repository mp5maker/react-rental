import { Card as AntCard } from 'antd'
import * as React from 'react'

const Card: React.FC<React.ComponentProps<typeof AntCard>> = ({ ...props }: any) => {
  return <AntCard {...props} />
}

export default Card
