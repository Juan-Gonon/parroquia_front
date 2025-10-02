import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ComunitySection } from '../../features/comunity/ComunitySection'

export const ComunityPage = () => {
  return (
    <Container>
      <Navbar></Navbar>
      <ComunitySection></ComunitySection>
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  background: aquamarine;
  position: relative;
`
