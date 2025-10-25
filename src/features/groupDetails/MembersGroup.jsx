/* eslint-disable react-hooks/exhaustive-deps */

// import { EditMemberForm } from './EditMemberForm'
import { useEffect, useState } from 'react'
import { useThemeStore } from '../../hook/useThemeStore'
import { useUIdraw } from '../../hook/useUIdraw'
import styled from 'styled-components'
import { RightDrawer } from '../../layout/RightDrawer'
import { TableC } from '../../components/TableC'
import { Footer } from '../../components/Footer'
import { EditMemberForm } from './EditMemberForm'

export const MembersGroup = ({ refresh, data }) => {
  const { theme } = useThemeStore()
  const { closeDraw, openDraw } = useUIdraw()
  const [selected, setSelected] = useState(null)

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

  return (
    <Container $themeUse={theme}>
      <section className='table-content'>
        <div className='table-body'>
          <TableC data={data} onRowClick={handleRowClick} />
        </div>
      </section>

      <RightDrawer onClose={handleClose}>
        {selected && (
          <EditMemberForm
            initialData={selected}
            onDeleted={() => {
              refresh()
              handleClose()
            }}
          />
        )}
      </RightDrawer>
    </Container>
  )
}

const Container = styled.main`
  width: 100%;
  /* height: 60vh; */
  min-height: auto;
  height: auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .table-content {
    background-color: ${({ theme }) => theme.bgtgderecha};
    border-radius: 10px;
    overflow: hidden;
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
