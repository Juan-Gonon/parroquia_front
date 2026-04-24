/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { useThemeStore } from '../../hook/useThemeStore'
import { ContentComunity } from './ContentComunity'
import { useEffect, useState } from 'react'
import { CommunityCard } from '../../components/CommunityCard'
import { useUIdraw } from '../../hook/useUIdraw'
import { RightDrawer } from '../../layout/RightDrawer'
import { EditCommunityForm } from './EditCommunityForm'

export const ComunitySection = ({ refresh, data }) => {
  const { theme } = useThemeStore()
  const [selected, setSelected] = useState(null)
  const { closeDraw, openDraw } = useUIdraw()

  useEffect(() => {
    refresh()
  }, [])

  const handleSelectedClick = (community) => {
    setSelected(community)
    openDraw()
  }

  const handleClose = () => {
    closeDraw()
    setTimeout(() => setSelected(null), 320)
  }

  return (
    <Container $theme={theme}>
      <section className='table-content'>
        <div className='table-body'>
          <CardsGrid>
            {data.map((community) => (
              <CommunityCard
                key={community.id_comunidad}
                community={community}
                handleSelectedClick={handleSelectedClick}
              />
            ))}
          </CardsGrid>
        </div>
      </section>

      <RightDrawer onClose={handleClose}>
        {selected && (
          <>
            <EditCommunityForm
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

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  gap: 20px;
  justify-content: center;
`
