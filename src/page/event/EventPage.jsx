import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { EventSection } from '../../features/event/EventSection'

export const EventPage = () => {
  return (
    <Container>
      <Navbar textBtn='Crear nuevo evento'>
        <ContentContainer>
          <Title>Eventos</Title>
          <Citation>
            "El señor es mi pastor, name me falta." <br /> (Salmo 23:1)
          </Citation>
        </ContentContainer>
      </Navbar>
      <EventSection />
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
