/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { GroupDetails } from '../../features/groupDetails/GroupDetails'
import { MembersGroup } from '../../features/groupDetails/MembersGroup'
import { FcPrevious } from 'react-icons/fc'
import { AddButtonC } from '../../components/AddButton'
import { useNavigate, useParams } from 'react-router-dom'
import { useGrupoServicioService } from '../../hook/useGrupoService'
import { useEffect } from 'react'
import { useGroupMembers } from '../../hook/useGroupMembers'

export const GroupDetailsPage = () => {
  const { id } = useParams()
  const { grupos, getByIdGrupoS } = useGrupoServicioService()
  const { members, getByIdMembersGrupoS } = useGroupMembers()
  const navigate = useNavigate()
  // console.log(id)

  useEffect(() => {
    return async () => {
      try {
        await getByIdGrupoS({ id })
        await getByIdMembersGrupoS({ id })
      } catch (error) {
        navigate('/home')
      }
    }
  }, [])

  // console.log(members)

  const handleBack = () => {
    navigate(-1)
  }

  // console.log(grupos)

  return (
    <Container>
      <Header>
        <FcPrevious size='1.8em' onClick={handleBack} cursor='pointer' />
        <HeaderContent>
          <Title>{grupos?.nombre}</Title>
        </HeaderContent>
      </Header>
      <GroupDetails data={grupos} />
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
