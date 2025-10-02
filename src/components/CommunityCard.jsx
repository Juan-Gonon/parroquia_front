import styled, { useTheme } from 'styled-components'
import { FaChurch } from 'react-icons/fa'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'

export const CommunityCard = ({ community }) => {
  const { nombre, direccion, telefono, email, parroquia } = community
  const theme = useTheme()

  return (
    <CardContainer>
      <ImageContainer>
        <img
          src='https://cdn.pixabay.com/photo/2023/08/03/19/34/catholic-church-8167850_1280.png'
          alt={`Fachada de ${nombre}`}
        />
      </ImageContainer>

      <InfoContainer>
        <Header>
          <ParishText>{parroquia}</ParishText>
          <ChurchIcon>
            <FaChurch size='1.2em' color={theme.primary} />
          </ChurchIcon>
        </Header>

        {/* Nombre de la Comunidad */}
        <CommunityName>{nombre}</CommunityName>

        <Details>
          {/* Dirección */}
          <DetailItem>
            <IconWrapper>
              <MdLocationOn size='1.1em' />
            </IconWrapper>
            <div>
              <Label>Dirección</Label>
              <Value>{direccion}</Value>
            </div>
          </DetailItem>

          {/* Teléfono */}
          <DetailItem>
            <IconWrapper>
              <AiOutlinePhone size='1.1em' />
            </IconWrapper>
            <div>
              <Label>Teléfono</Label>
              <Value>{telefono}</Value>
            </div>
          </DetailItem>

          {/* Email */}
          <DetailItem>
            <IconWrapper>
              <AiOutlineMail size='1.1em' />
            </IconWrapper>
            <div>
              <Label>Email</Label>
              <Value>{email}</Value>
            </div>
          </DetailItem>
        </Details>
      </InfoContainer>
    </CardContainer>
  )
}

// --- Styled Components ---

const CardContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.bgtgderecha};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

const ChurchIcon = styled.div`
  /* El ícono de la iglesia ya tiene el color primary */
`

const CommunityName = styled.h2`
  font-size: ${({ theme }) => theme.fontlg};
  color: ${({ theme }) => theme.textprimary || theme.text};
  margin: 0 0 20px 0;
  font-weight: 700;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
`

const IconWrapper = styled.div`
  margin-right: 15px;
  color: ${({ theme }) => theme.gray500};
  padding-top: 3px;
`

const Label = styled.p`
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.gray500};
  margin: 0;
  line-height: 1.2;
`

const Value = styled.p`
  font-size: ${({ theme }) => theme.fontmd};
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-weight: 500;
  word-break: break-word;
`
