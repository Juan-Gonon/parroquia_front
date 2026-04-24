import { MdOutlineChurch } from 'react-icons/md'
import styled from 'styled-components'

export const ComunityCardHome = ({ nombre, direccion }) => {
  return (
    <Container>
      <TitleIconContainer>
        <MdOutlineChurch size='2em' color='#3498db' />
      </TitleIconContainer>
      <HeaderContent>
        <h2>{nombre}</h2>
        <p>{direccion}</p>
      </HeaderContent>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  /* background-color: #fcfcfc; */
  gap: 15px;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const HeaderContent = styled.div`
  flex-grow: 1;

  h2 {
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.textprimary || '#333'};
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
    font-weight: 400;
  }
`
