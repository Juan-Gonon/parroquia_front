import { FaChurch } from 'react-icons/fa'
import { GiPeaceDove } from 'react-icons/gi'
import { GrFormPreviousLink } from 'react-icons/gr'
import styled from 'styled-components'
import { InfoSection } from '../../features/home/InfoSection'

export const Home = () => {
  return (
    <Container>
      <Header>
        <TitleIconContainer>
          <FaChurch size='2em' />
        </TitleIconContainer>
        <HeaderContent>
          <h2>Dashboard</h2>
          <p> "El Señor es mi pastor, nada me falta." - (Salmo 23:1)</p>
        </HeaderContent>
        <IconBackgDef>
          <GiPeaceDove size='8em' color='#fff' />
        </IconBackgDef>
      </Header>
      <InfoSection />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
  padding-top: 5px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 25px 20px;
  /* border-bottom: 1px solid #eee; */
  gap: 15px;
  background-color: ${({ theme }) => theme.whiteBg};
  width: 98%;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: relative;
  height: ${({ theme }) => theme.navHeight};
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.textsecondary};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* font-style: italic; */
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bgtotal};
  padding: 8px;
  border-radius: 50px;
`

const HeaderContent = styled.div`
  flex-grow: 1;
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.textsecondary};
  }
  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray300};
    margin: 0;
  }
`

const IconBackgDef = styled.div`
  /* background-color: ${({ theme }) => theme.bg4}; */
  padding: 8px;
  border-radius: 8px;
  position: absolute;
  /* background: red; */
  right: 45px;
  opacity: 0.5;
`

// const TitleIconContainer = styled.div`
//   background-color: ${({ theme }) => theme.bg3};
//   padding: 8px;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `

// const HeaderContent = styled.div`
//   flex-grow: 1;

//   h2 {
//     font-size: 1.1rem;
//     font-weight: 700;
//     color: ${({ theme }) => theme.textprimary || '#333'};
//     margin: 0;
//   }

//   p {
//     font-size: 0.8rem;
//     color: ${({ theme }) => theme.gray500};
//     margin: 0;
//     font-weight: 400;
//   }
// `
