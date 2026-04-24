// FooterStyles.js
import { GrNext, GrPrevious } from 'react-icons/gr'
import styled from 'styled-components'

export const Footer = ({ pagination, onNextPage, onPrevPage }) => {
  const { page = 1, limit = 10, total = 0, next, prev } = pagination || {}

  const startCount = (page - 1) * limit + 1
  const endCount = Math.min(page * limit, total)

  // console.log({
  //   startCount,
  //   endCount,
  // })

  const countText =
    total > 0
      ? `Mostrando ${startCount} a ${endCount} de ${total}`
      : 'No hay registros'

  return (
    <FooterContainer>
      <PaginationControls>
        <NavButton onClick={onPrevPage} disabled={!prev}>
          <GrPrevious />
        </NavButton>

        <PaginationInfo>{countText}</PaginationInfo>

        <NavButton onClick={onNextPage} disabled={!next}>
          <GrNext />
        </NavButton>
      </PaginationControls>

      {/* 2. SECCIÓN DEL SALMO (Fija) */}
      {/* <SalmoMessage>
        <p>
          «El que quiera ser grande entre ustedes, que sea su servidor.» - Mateo
          20:26
        </p>
      </SalmoMessage> */}
    </FooterContainer>
  )
}

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  /* padding: 12px 0; */
  /* Usamos bg3 o gray300 como borde suave */
  /* border-top: 1px solid ${({ theme }) => theme.bg3 || theme.gray300}; */
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontsm}; /* Tamaño de letra pequeño */
`

export const PaginationControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  /* padding: 4px 0; */
`

export const NavButton = styled.button`
  /* Usamos primary para el color principal del botón */
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  font-size: ${({ theme }) => theme.fontsm};

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.gray500};
    cursor: not-allowed;
  }
`

export const PaginationInfo = styled.span`
  color: ${({ theme }) => theme.texttertiary};
  padding: 0 10px;
  min-width: 180px;
  text-align: center;
`

export const SalmoMessage = styled.div`
  /* position: absolute; */
  font-style: italic;
  text-align: center;
  color: ${({ theme }) => theme.texttertiary};
  /* padding: 8px 16px; */
  background-color: ${({ theme }) => theme.bg2};
  border-radius: 8px;
  /* border: 1px solid ${({ theme }) => theme.bg3}; */
  max-width: 50%;
  /* right: 50px; */
`
