import * as React from 'react'
import get from 'lodash/get'
import { v4 } from 'uuid'
import idGenerator from '../../utitlities/idGenerator'
import './table.scss'

interface ITableProps<T> {
  serial?: boolean
  properties: Array<string>
  data: Array<T>
  children?: React.ReactNode
  headerTitles?: any
  columnSpacing?: any
  equallySpaced?: boolean
  customHeader?: ({ title, property }: any) => string | React.ReactNode
  customBody: ({ row, column }: any) => string | React.ReactNode
  noDataComponent?: React.ReactNode
}

const generatedUUID = v4()
const generator = idGenerator()

const Table = <T,>({
  serial = true,
  properties,
  data = [],
  headerTitles,
  columnSpacing = {},
  equallySpaced = false,
  customHeader,
  customBody,
  noDataComponent
}: ITableProps<T>) => {
  const columns = properties.length + (serial ? 1 : 0)

  return (
    <div className={'table-container'}>
      <table>
        <thead>
          <tr>
            {[...(serial ? ['id'] : []), ...properties].map((item, headerKey) => {
              const title: string = get(headerTitles, item, '') as string
              const space = get(columnSpacing, item, '')
              const thProps = {
                ...(equallySpaced ? { width: `${Math.floor(100 / columns)}%` } : {}),
                ...(space ? { width: space } : {})
              }
              if (item === 'id') {
                return (
                  <th
                    key={`${generatedUUID}-${generator.next().value}-${headerKey}-${item}`}
                    {...thProps}
                  >
                    <div>ID</div>
                  </th>
                )
              }
              return (
                <th key={`${generatedUUID}-${generator.next().value}-${headerKey}`} {...thProps}>
                  <div>{customHeader ? customHeader({ title, property: item }) : title}</div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {data.length ? (
            data.map((row, rowKey) => {
              return (
                <tr key={`${generatedUUID}-${generator.next().value}-${rowKey}`}>
                  {[...(serial ? ['id'] : []), ...properties].map((column, columnKey) => {
                    const space = get(columnSpacing, column, '')
                    const tdProps = {
                      ...(equallySpaced ? { width: `${Math.floor(100 / columns)}%` } : {}),
                      ...(space ? { width: space } : {})
                    }
                    if (column === 'id')
                      return (
                        <td
                          key={`${generatedUUID}-${generator.next().value}-${rowKey}-${columnKey}`}
                          {...tdProps}
                        >
                          {rowKey + 1}
                        </td>
                      )
                    return (
                      <td
                        key={`${generatedUUID}-${generator.next().value}-${rowKey}-${columnKey}`}
                        {...tdProps}
                      >
                        {customBody ? customBody({ column, row }) : <></>}
                      </td>
                    )
                  })}
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={columns}>{noDataComponent ? noDataComponent : <></>}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table
