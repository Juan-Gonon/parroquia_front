import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ComunitySection } from '../../features/comunity/ComunitySection'
import { ParishModal } from '../../features/parish-staff/ParishModal'
import { CommunityModal } from '../../features/comunity/CommunityModal'
import { useCommunity } from '../../hook/useCommunity'
import { useCallback } from 'react'

export const ComunityPage = () => {
  const { getAllCommunityS, community } = useCommunity()

  const refresh = useCallback(async () => {
    const res = await getAllCommunityS({ page: 1, limit: 20 })
    return res
  }, [getAllCommunityS])

  return (
    <Container>
      <Navbar textBtn='Crear nueva comunidad'>
        <ContentContainer>
          <Title>Comunidades de Fe</Title>
          <Citation>
            "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de
            ellos." <br /> (Mateo 18:20)
          </Citation>
        </ContentContainer>
        <CommunityModal onCreated={refresh} />
      </Navbar>
      <ComunitySection refresh={refresh} data={community} />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
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
  /* font-style: italic; */
`

const Citation = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray400};
  margin: 0;
  padding-top: 5px;
  font-weight: 600;
  font-style: italic;
`
