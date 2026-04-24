import React from 'react'
import styled, { useTheme } from 'styled-components'
import { FaChurch } from 'react-icons/fa'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'
import imgI from '../../public/imgIgle01.png'

export const CommunityCard = ({ community, handleSelectedClick }) => {
  const { nombre, direccion, telefono, email, parroquia } = community
  const theme = useTheme()

  const handleDetailsClick = () => {
    handleSelectedClick(community)
  }

  return (
    <CardContainer>
      <ImageContainer>
        <img src={imgI} alt={`Fachada de ${nombre}`} />
      </ImageContainer>

      <InfoContainer>
        <Header>
          <ParishText>{parroquia}</ParishText>
          <ChurchIcon>
            <FaChurch size='1.2em' color={theme.primary} />
          </ChurchIcon>
        </Header>

        <CommunityName>{nombre}</CommunityName>

        <ContentWrapper>
          <Details>
            <DetailItem>
              <IconWrapper>
                <MdLocationOn size='1.4em' />
              </IconWrapper>
              <Value>{direccion}</Value>
            </DetailItem>

            <DetailItem>
              <IconWrapper>
                <AiOutlinePhone size='1.4em' />
              </IconWrapper>
              <Value>{telefono ?? 'Sin número'}</Value>
            </DetailItem>

            <DetailItem>
              <IconWrapper>
                <AiOutlineMail size='1.4em' />
              </IconWrapper>
              <Value>{email ?? 'Sin correo'}</Value>
            </DetailItem>
          </Details>

          <CardFooter>
            <DetailsButton onClick={handleDetailsClick}>
              Ver Detalles
            </DetailsButton>
          </CardFooter>
        </ContentWrapper>
      </InfoContainer>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.lightbackground};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.2s;
  height: 280px;

  &:hover {
    transform: translateY(-3px);
  }
`

const ImageContainer = styled.div`
  width: 40%;
  min-width: 250px;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 600px) {
    display: none;
  }
`

const InfoContainer = styled.div`
  padding: 20px;
  flex-grow: 1;
  width: 60%;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
`

const ParishText = styled.span`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  text-transform: uppercase;
`

const ChurchIcon = styled.div``

const CommunityName = styled.h2`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary || theme.text};
  margin: 0 0 10px 0;
  font-weight: 700;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
`

const IconWrapper = styled.div`
  margin-right: 15px;
  color: ${({ theme }) => theme.barrascroll};
`

const Value = styled.p`
  font-size: ${({ theme }) => theme.fontmd};
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-weight: 500;
  word-break: break-word;
`

const CardFooter = styled.div`
  padding-top: 15px;
  border-top: 1px solid ${({ theme }) => theme.bg3};
  display: flex;
  justify-content: flex-end;
`

const DetailsButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: ${({ theme }) => theme.fontmd};
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.primary}cc;
    text-decoration: underline;
  }
`
