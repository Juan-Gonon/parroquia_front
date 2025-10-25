import styled, { useTheme } from 'styled-components'
import { MdDeleteForever } from 'react-icons/md'

export const GroupAsigEveCard = ({ id, nombre, ministerio, handleDelete }) => {
  const theme = useTheme()

  return (
    <Card $theme={theme}>
      <ParishText>{ministerio}</ParishText>
      <Header>
        <MdDeleteForever
          size='1.4em'
          onClick={() => handleDelete(id)}
          cursor='pointer'
        />
        <h2>{nombre}</h2>
      </Header>
    </Card>
  )
}

const ParishText = styled.span`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.barrascroll};
  font-weight: 600;
  text-transform: uppercase;
  text-align: end;
  /* background: red; */
  display: block;
`

/* STYLES */
const Card = styled.div`
  background: ${({ theme }) => theme.lightbackground};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  h3 {
    /* background: red; */
    text-align: end;
    /* display: inline-block; */
    color: ${({ theme }) => theme.textprimary};
    text-transform: uppercase;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  h2 {
    font-size: 1.1rem;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
`
