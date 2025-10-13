import styled from 'styled-components'
import { GroupDetails } from '../../features/groupDetails/GroupDetails'
import { MembersGroup } from '../../features/groupDetails/MembersGroup'
import { FcPrevious } from 'react-icons/fc'
import { AddButtonC } from '../../components/AddButton'
import { useParams } from 'react-router-dom'

export const GroupDetailsPage = () => {
  const { id } = useParams()
  // console.log(id)

  return (
    <Container>
      <Header>
        <FcPrevious size='1.8em' />
        <HeaderContent>
          <Title>Coro Parroquial "Voces de Fe"</Title>
        </HeaderContent>
      </Header>
      <GroupDetails />
      <Header>
        <HeaderContent>
          <Title>Miembros del Grupo</Title>
        </HeaderContent>
        <AddButtonC textBtn='Añadir Miembro' />
      </Header>
      <MembersGroup />
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
  /* margin-right: auto; */
  padding: 0 10px;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  gap: 15px;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px;
  border-radius: 8px;
`

const HeaderContent = styled.div`
  flex-grow: 1;
  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0;
    color: ${({ theme }) => theme.textprimary};
  }
  p {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.gray500};
    margin: 0;
  }
`
