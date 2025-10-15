import styled, { css } from 'styled-components'

export const GroupDetails = ({ data }) => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <h2>Detalles del Grupo</h2>
        </HeaderContent>
        {/* <DangerBtn type='button' onClick={handleDelete}>
          Eliminar
        </DangerBtn> */}
      </Header>
      <Details>
        <DetailItem>
          <TextPlaceholder>Nombre del Grupo</TextPlaceholder>
          <Value>{data.nombre}</Value>
        </DetailItem>
        <DetailItem>
          <TextPlaceholder>Ministerio</TextPlaceholder>
          <Value>{data.ministerio}</Value>
        </DetailItem>
        <DetailItem>
          <TextPlaceholder>Descripción</TextPlaceholder>
          <Value>{data.descripcion}</Value>
        </DetailItem>
        <DetailItem>
          <TextPlaceholder>Activo</TextPlaceholder>
          <Status $active={data.activo}>
            {data.activo ? 'Activo' : 'Inactivo'}
          </Status>
        </DetailItem>
      </Details>
    </Container>
  )
}

const Container = styled.main`
  /* position: absolute; */
  position: relative;
  /* top: 10px; */
  /* left: 0; */
  width: 99%;
  padding: 0 20px 10px;
  min-height: ${({ theme }) => theme.navHeight};
  /* display: flex;
  justify-content: space-around;
  align-items: center; */
  background-color: ${({ theme }) => theme.bgtgderecha};
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); */
  z-index: 100;
  /* background: red; */
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px 15px;
  /* border-bottom: 1px solid #eee; */
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

const ContentText = styled.div`
  /* background: aqua; */
  display: inline-block;
  padding: 10px 15px;
`

const TextPlaceholder = styled.p`
  font-size: 0.9em;
  color: ${({ theme }) => theme.gray400};
  margin: 0;
  padding-top: 5px;
  font-weight: 600;
  font-style: italic;
`

const Details = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 10px;
  justify-content: space-around;
`

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const IconWrapper = styled.div`
  margin-right: 15px;
  color: ${({ theme }) => theme.primary};
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

const Status = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-weight: 600;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: ${({ $active }) =>
    $active ? 'rgba(46, 204, 113, 0.6)' : 'rgba(231, 76, 60, 0.6)'};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px); /* soporte para Safari */
  border: 1px solid rgba(255, 255, 255, 0.3); /* opcional, para darle un borde suave */
`

const ButtonBase = css`
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.95rem;
  line-height: 1;
`

const DangerBtn = styled.button`
  ${ButtonBase}
  background: none;
  color: #e74c3c;
  border: 1px solid #e74c3c;

  &:hover {
    background: ${({ theme }) => theme.gray500};
  }
`

const SaveBtn = styled.button`
  ${ButtonBase}
  background-color: ${({ theme }) => theme.bg4};
  color: ${({ theme }) => theme.textsecondary};
  border: none;

  &:hover {
    background-color: #2980b9;
  }
`
