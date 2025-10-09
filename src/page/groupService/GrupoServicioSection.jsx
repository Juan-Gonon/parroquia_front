/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useUIdraw } from '../../hook/useUIdraw'
import { RightDrawer } from '../../layout/RightDrawer'
import { GrupoServicioCard } from '../../components/GroupServicoCard'
// import { EditGrupoServicioForm } from './EditGrupoServicioForm'

export const GrupoServicioSection = ({ refresh, data }) => {
  const [selected, setSelected] = useState(null)
  const { openDraw, closeDraw } = useUIdraw()

  useEffect(() => {
    refresh()
  }, [])

  const handleSelect = (grupo) => {
    setSelected(grupo)
    openDraw()
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
              />
            ))}
          </CardsGrid>
        </div>
      </div>

      <RightDrawer onClose={handleClose}>
        {/* {selected && (
          <EditGrupoServicioForm
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
        )} */}
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
