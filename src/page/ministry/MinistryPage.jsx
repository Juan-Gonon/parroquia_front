import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { useCallback, useEffect } from 'react'
import { MinistrySection } from '../../features/ministry/MinistrySection'
import { useMinistryService } from '../../hook/useMinistryService'

export const MinistryPage = () => {
  const { ministry, getAllMinistryS } = useMinistryService()

  const refresh = useCallback(async () => {
    const res = await getAllMinistryS({ page: 1, limit: 20 })
    return res
  }, [getAllMinistryS])

  return (
    <Container>
      <Navbar textBtn='Crear nuevo Ministerio'>
        <ContentContainer>
          <Title>Comunidades de Fe</Title>
          <Citation>
            "Donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de
            ellos." <br /> (Mateo 18:20)
          </Citation>
        </ContentContainer>
      </Navbar>
      <MinistrySection refresh={refresh} data={ministry} />
      {/* <MinistrySection /> */}
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
