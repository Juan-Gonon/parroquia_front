/* eslint-disable react-hooks/exhaustive-deps */

// import { EditMemberForm } from './EditMemberForm'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useThemeStore } from '../../hook/useThemeStore'
import { useUIdraw } from '../../hook/useUIdraw'
import { TableC } from '../../components/TableC'
import { RightDrawer } from '../../layout/RightDrawer'
import { EditIntentionForm } from '../intention/EditIntentionForm'

export const EventDetailsSection = ({ refresh, data }) => {
  const { theme } = useThemeStore()
  const { closeDraw, openDraw } = useUIdraw()
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await refresh()
      setLoading(false)
    }
    fetchData()
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
          {loading ? (
            <MessageContainer>
              <Spinner />
              <p>Cargando intenciones...</p>
            </MessageContainer>
          ) : data?.length > 0 ? (
            <TableC data={data} onRowClick={handleRowClick} />
          ) : (
            <MessageContainer>
              <EmptyIcon>📭</EmptyIcon>
              <h3>Este evento no tiene intenciones registradas</h3>
              <p>
                Puedes agregar nuevas intenciones desde el módulo principal.
              </p>
            </MessageContainer>
          )}
        </div>
      </section>

      <RightDrawer onClose={handleClose}>
        {selected && (
          <EditIntentionForm
            initialData={selected}
            onSaved={() => {
              refresh()
              handleClose()
            }}
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
  min-height: 20vh;
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

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  text-align: center;
  color: ${({ theme }) => theme.textprimary};
  opacity: 0.9;

  h3 {
    margin-top: 10px;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
    margin-top: 5px;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
  }
`

const EmptyIcon = styled.span`
  font-size: 2rem;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${({ theme }) => theme.bg3};
  border-top-color: ${({ theme }) => theme.textprimary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
