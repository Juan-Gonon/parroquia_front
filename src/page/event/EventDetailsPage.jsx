/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom'
import { useEvent } from '../../hook/useEvent'
import { useEffect } from 'react'
import styled from 'styled-components'
import { FcPrevious } from 'react-icons/fc'
import { useUiModal } from '../../hook/useUiModal'
import { AddButtonC } from '../../components/AddButton'

export const EventDetailsPage = () => {
  const { id } = useParams()
  const { events, getEventByIdS } = useEvent()
  const navigate = useNavigate()
  const { openModal } = useUiModal()
  // console.log(id)

  useEffect(() => {
    return async () => {
      try {
        await getEventByIdS({ id })
      } catch (error) {
        // console.log(error)
        navigate('/home')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log({
  //   id,
  //   events,
  // })

  const handleBack = () => {
    navigate(-1)
  }

  const handleOpenModal = () => {
    // await getByMinistryParticipationS({ id: grupos?.id_ministerio })
    openModal()
  }

  return (
    <Container>
      <Header>
        <TitleIconContainer>
          <FcPrevious
            size='1.8em'
            color='#fff'
            onClick={handleBack}
            cursor='pointer'
          />
        </TitleIconContainer>
        <HeaderContent>
          <Title>{events?.nombre}</Title>
        </HeaderContent>
      </Header>
      <SubHeader>
        <HeaderContent>
          <SubTitle>Intenciones</SubTitle>
        </HeaderContent>
        <AddButtonC textBtn='Agregar Intención' handleClick={handleOpenModal} />
        {/* <ModalMembersGroup grupo={grupos} onCreated={refreshMembers} /> */}
      </SubHeader>
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
  padding-top: 10px;
`

// const ContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   /* margin-right: auto; */
//   padding: 0 10px;
//   align-items: center;
// `

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.textsecondary};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* font-style: italic; */
`

// const Citation = styled.p`
//   font-size: 0.7rem;
//   color: ${({ theme }) => theme.gray400};
//   margin: 0;
//   padding-top: 5px;
//   font-weight: 600;
//   font-style: italic;
// `

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
`

const TitleIconContainer = styled.div`
  /* background-color: ${({ theme }) => theme.bg4}; */
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

// const TitleIconContainer = styled.div`
//   background-color: ${({ theme }) => theme.bg3};
//   padding: 8px;
//   border-radius: 8px;
//   /* background-color: ${({ theme }) => theme.bg4}; */
//   /* color: ${({ theme }) => theme.textsecondary}; */
// `

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  gap: 15px;
`

const SubTitle = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* font-style: italic; */
`
