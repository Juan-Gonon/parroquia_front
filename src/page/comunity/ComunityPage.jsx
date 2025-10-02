import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ComunitySection } from '../../features/comunity/ComunitySection'

export const ComunityPage = () => {
  return (
    <Container>
      <Navbar>
        <h1>Comunidad de Fe</h1>
        <p>
          Donde dos o tres se reúnen en mi nombre, alli estoy yo en medio de
          ellos <br /> Mateo 18:20
        </p>
      </Navbar>
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
