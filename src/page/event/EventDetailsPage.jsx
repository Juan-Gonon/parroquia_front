/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from 'react-router-dom'
import { useEvent } from '../../hook/useEvent'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useUiModal } from '../../hook/useUiModal'
import { AddButtonC } from '../../components/AddButton'
import { useIntentionService } from '../../hook/useIntentionService'
import { EventDetailsSection } from '../../features/event/EventDetailsSection'
import { ModalIntencion } from '../../features/intention/ModalIntention'
import { GrFormPreviousLink } from 'react-icons/gr'
import { GiPeaceDove } from 'react-icons/gi'
import { MdOutlineAdfScanner } from 'react-icons/md'
import { PDFViewer } from '@react-pdf/renderer'
import { PDF } from '../../components/PDF'

export const EventDetailsPage = () => {
  const [showPdf, setShowPdf] = useState(false)
  const { id } = useParams()
  const { events, getEventByIdS } = useEvent()
  const navigate = useNavigate()
  const { openModal } = useUiModal()
  const { intention, getIntentionByEventS } = useIntentionService()

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

  const refreshMembers = useCallback(async () => {
    await getIntentionByEventS({ id })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getIntentionByEventS])

  const handleBack = () => {
    navigate(-1)
  }

  const handleOpenModal = () => {
    openModal()
  }

  const handleOpenPdf = () => {
    setShowPdf(true)
  }

  const handleClosePdf = () => {
    setShowPdf(false)
  }

  useEffect(() => {
    refreshMembers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log({
  //   intention,
  //   events,
  // })
  return (
    <Container>
      <Header>
        <TitleIconContainer>
          <GrFormPreviousLink
            size='2em'
            color='#fff'
            onClick={handleBack}
            cursor='pointer'
          />
        </TitleIconContainer>
        <HeaderContent>
          <Title>{events?.nombre}</Title>
        </HeaderContent>
        <IconBackgDef>
          <GiPeaceDove size='8em' color='#fff' />
        </IconBackgDef>
      </Header>
      <SubHeader>
        <HeaderContent>
          <SubTitle>Intenciones</SubTitle>
        </HeaderContent>
        <TitleIconContainer>
          <MdOutlineAdfScanner
            size='2em'
            color='#fff'
            cursor='pointer'
            onClick={handleOpenPdf}
          />
        </TitleIconContainer>
        <AddButtonC
          textBtn='Agregar Intención'
          handleClick={handleOpenModal}
          disabled={!events?.aceptaintenciones}
        />
        <ModalIntencion
          idEvento={events?.id_evento}
          onCreated={refreshMembers}
        />
      </SubHeader>
      <EventDetailsSection refresh={refreshMembers} data={intention} />
      {showPdf && (
        <PDFOverlay>
          <CloseBtn onClick={handleClosePdf}>✕</CloseBtn>
          <PDFViewer width='80%' height='90%'>
            <PDF />
          </PDFViewer>
        </PDFOverlay>
      )}
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
  overflow: hidden;
  position: relative;
`

const TitleIconContainer = styled.div`
  background-color: ${({ theme }) => theme.bg4};
  padding: 8px;
  border-radius: 50px;
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

const PDFOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const CloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #fff;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10000;
  transition: 0.2s ease;
  &:hover {
    background: #f1f1f1;
  }
`
