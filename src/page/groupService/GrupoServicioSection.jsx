/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useUIdraw } from '../../hook/useUIdraw'
import { RightDrawer } from '../../layout/RightDrawer'
import { GrupoServicioCard } from '../../components/GroupServicoCard'
import { EditGrupoServiceForm } from './EditGrupoServiceForm'
import { useLocation, useNavigate } from 'react-router-dom'
// import { EditGrupoServicioForm } from './EditGrupoServicioForm'

export const GrupoServicioSection = ({ refresh, data }) => {
  const [selected, setSelected] = useState(null)
  const { openDraw, closeDraw } = useUIdraw()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    refresh()
  }, [])

  const handleSelect = (grupo) => {
    setSelected(grupo)
    openDraw()
  }

  const handleSelectDetail = (grupo) => {
    navigate(`${location.pathname}/${grupo?.id_grupo}`)
  }

  const handleClose = () => {
    closeDraw()
    setTimeout(() => setSelected(null), 300)
  }

  // console.log(selected)

  return (
    <Container>
      <div className='table-content'>
        <div className='table-body'>
          <CardsGrid>
            {data.map((grupo) => (
              <GrupoServicioCard
                key={grupo.id_grupo}
                grupo={grupo}
                handleSelect={handleSelect}
                handleSelectDetail={handleSelectDetail}
                onDeleted={() => {
                  refresh()
                }}
              />
            ))}
          </CardsGrid>
        </div>
      </div>

      <RightDrawer onClose={handleClose}>
        {selected && (
          <EditGrupoServiceForm
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
  height: calc(100vh - ${({ theme }) => theme.navHeight});
  margin-top: ${({ theme }) => theme.navHeight};
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal};
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`
