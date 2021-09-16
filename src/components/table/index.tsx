import * as React from 'react'
import get from 'lodash/get'

interface ITableProps<T> {
  properties: Array<string>
  data: Array<T>
  children?: React.ReactNode
  headerTitles?: any
  customHeader?: ({ title, property }: any) => string | React.ReactNode
  customBody?: ({ row, column }: any) => string | React.ReactNode
}

const Table = <T,>({
  properties,
  data,
  headerTitles,
  customHeader,
  customBody
}: ITableProps<T>) => {
  return (
    <div className={'table-container'}>
      <table>
        <thead>
          <tr>
            {properties.map(item => {
              const title: string = get(headerTitles, item, '') as string
              return customHeader ? customHeader({ title, property: item }) : title
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            return (
              <tr>
                {properties.map(column => {
                  return <td>{customBody ? customBody({ column, row }) : <></>}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
