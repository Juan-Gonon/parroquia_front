import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useMemo } from 'react'
import { useThemeStore } from '../hook/useThemeStore'
import styled from 'styled-components'

export const TableC = ({ data, onRowClick }) => {
  const { theme } = useThemeStore()
  const columns = useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }

    const firstItem = data[0]
    const keys = Object.keys(firstItem)

    return keys
      .filter((key) => key !== 'id')
      .map((key) => ({
        header: key.charAt(0).toUpperCase() + key.slice(1),
        accessorKey: key,
      }))
  }, [data])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <StyledTable $themeUse={theme}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} onClick={() => onRowClick?.(row.original)}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  )
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    position: sticky;
    top: 0;
    background-color: ${({ theme }) => theme.bg2};
    z-index: 10;

    th {
      text-align: left;
      padding: 15px;
      font-weight: 600;
      color: ${({ theme }) => theme.textprimary};
      text-transform: uppercase;
      font-size: ${({ theme }) => theme.fontsm};
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid ${({ theme }) => theme.bg3};
      transition: background-color 0.3s ease;

      &:last-of-type {
        border-bottom: none;
      }

      &:hover {
        background-color: ${({ theme }) => theme.bg3};
      }

      &:nth-of-type(even) {
        background-color: ${({ theme }) => theme.bg3};
      }
    }

    td {
      padding: 15px;
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.fontsm};
    }
  }
`
