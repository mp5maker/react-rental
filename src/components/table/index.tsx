import * as React from 'react'
import get from 'lodash/get'

type ITableProps<T> {
  properties: Array<keyof T>
  data: Array<T>
  children?: React.ReactNode
  headerTitles?: any
  customHeader?: (({ title, property }: { title: string, property: string }) => string | React.ReactNode)
  customBody?: ({ item }: { item: T }) => string | React.ReactNode
}

const Table = <T, >({
  properties,
  data,
  headerTitles,
  customHeader,
  customBody,
}: ITableProps<T>) => {

  return (
    <div className={'table-container'}>
      <table>
        <thead>
          <tr>
            {
              properties.map((item) => {
                const title: string = get(headerTitles, item, '') as string
                return customHeader ? customHeader({title, property: item }) : title
              })
            }
          </tr>
        </thead>
      </table>
    </div>
  )
}