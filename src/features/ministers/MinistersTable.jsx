/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { useThemeStore } from '../../hook/useThemeStore'
import { useEffect, useState } from 'react'
import { TableC } from '../../components/TableC'
import { RightDrawer } from '../../layout/RightDrawer'
import { useUIdraw } from '../../hook/useUIdraw'
import { Footer } from '../../components/Footer'

export const MinistersTable = ({
  refresh,
  data,
  pagination,
  onNextPage,
  onPrevPage,
  filteringValue,
  setFiltering,
}) => {
  const { theme } = useThemeStore()

  const [selected, setSelected] = useState(null)
  // const [openDrawer, setOpenDrawer] = useState(false)
  const { closeDraw, openDraw } = useUIdraw()

  // console.log(parish)

  useEffect(() => {
    refresh()
  }, [])

  const handleRowClick = (rowData) => {
    setSelected(rowData)
    openDraw()
  }

  const handleClose = () => {
    closeDraw()
    setTimeout(() => setSelected(null), 320)
  }

  // console.log(selected)

  return (
    <Container $themeUse={theme}>
      <section className='table-content'>
        <div className='table-body'>
          <TableC
            data={data}
            onRowClick={handleRowClick}
            filteringValue={filteringValue}
            setFiltering={setFiltering}
          />
        </div>
        <div className='table-footer'>
          <Footer
            pagination={pagination}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
          />
        </div>
      </section>

      <RightDrawer onClose={handleClose}>
        {selected && (
          <>
            <h1>Ministers seleccionado</h1>
          </>
        )}
      </RightDrawer>
    </Container>
  )
}

const Container = styled.main`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.navHeight});
  margin-top: ${({ theme }) => theme.navHeight};
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};

  .table-content {
    background-color: ${({ theme }) => theme.bgtgderecha};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;

    .table-body {
      overflow-y: auto;
      padding: 20px;
    }

    .table-footer {
      background-color: ${({ theme }) => theme.bg2};
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: ${({ theme }) => theme.textprimary};
      border-top: 1px solid ${({ theme }) => theme.bg3};
    }
  }
`
