import * as React from 'react'
import './noDataFound.scss'

interface INoDataFoundProps {
  message?: string | React.ReactNode
}

const NoDataFound: React.FC<INoDataFoundProps> = ({ message = 'No Rentals Found' }) => {
  return <div className={'no-data-found-container'}>{message}</div>
}

export default NoDataFound
