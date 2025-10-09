import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { useCallback } from 'react'
import { useGrupoServicioService } from '../../hook/useGrupoService'
import { GrupoServicioModal } from '../../features/grupoServicio/GrupoServicioModal'
import { GrupoServicioSection } from './GrupoServicioSection'

export const GrupoServicioPage = () => {
  const { grupos, getAllGruposS } = useGrupoServicioService()

  const refresh = useCallback(async () => {
    const res = await getAllGruposS({ page: 1, limit: 20 })
    return res
  }, [getAllGruposS])

  return (
    <Container>
      <Navbar textBtn='Crear nuevo Grupo de Servicio'>
        <ContentContainer>
          <Title>Grupos de Servicio</Title>
          <Citation>
            “Sirvan al Señor con alegría; vengan ante su presencia con
            regocijo.” <br /> (Salmo 100:2)
          </Citation>
        </ContentContainer>
        <GrupoServicioModal onCreated={refresh} />
      </Navbar>
      <GrupoServicioSection refresh={refresh} data={grupos} />
    </Container>
  )
}

/* STYLES */
const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  position: relative;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: auto;
  padding: 0 10px;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

const Citation = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray400};
  margin: 0;
  padding-top: 5px;
  font-weight: 600;
  font-style: italic;
`
