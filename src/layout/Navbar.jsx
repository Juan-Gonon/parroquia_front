import styled from 'styled-components'
import { useThemeStore } from '../hook/useThemeStore'
import { MdAdd } from 'react-icons/md'
import { Search } from '../components/Search'
import { useUiModal } from '../hook/useUiModal'

export const Navbar = ({ children }) => {
  const { theme } = useThemeStore()
  const { openModal } = useUiModal()

  return (
    <Container $themeUse={theme}>
      {children}
      <ActionsSection>
        <AddButton onClick={openModal}>
          <MdAdd />
          <span>Agregar</span>
        </AddButton>
      </ActionsSection>
    </Container>
  )
}

const Container = styled.main`
  position: absolute;
  top: 5px;
  left: 0;
  width: 100%;
  padding: 0 30px;
  height: ${({ theme }) => theme.navHeight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.bgtgderecha};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  /* background: red; */
`

const ActionsSection = styled.section`
  display: flex;
  align-items: center;
  gap: 15px;
`

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.whiteBg};
  color: ${({ theme }) => theme.textsecondary};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontsm};
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bg4};
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    font-size: 1.2em;
  }
`
