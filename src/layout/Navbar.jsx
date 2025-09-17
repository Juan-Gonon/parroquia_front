import styled from 'styled-components'
import { useThemeStore } from '../hook/useThemeStore'
import { MdAdd } from 'react-icons/md' // Importamos un ícono para el botón de agregar
import { IoIosSearch } from 'react-icons/io' // Importamos un ícono para el buscador

export const Navbar = () => {
  const { theme } = useThemeStore()
  return (
    <Container $themeUse={theme}>
      <SearchSection>
        <SearchInputContainer>
          <IoIosSearch />
          <input type='text' placeholder='Buscar personal...' />
        </SearchInputContainer>
      </SearchSection>
      <ActionsSection>
        <AddButton>
          <MdAdd />
          <span>Agregar</span>
        </AddButton>
      </ActionsSection>
    </Container>
  )
}

const Container = styled.main`
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  padding: 5px 30px;
  height: ${({ $themeUse }) => $themeUse.navHeight};
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ $themeUse }) => $themeUse.bgtgderecha};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 100;
  /* background: red; */
`

const SearchSection = styled.section`
  flex-grow: 1;
  max-width: 400px;
`

const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: ${({ theme }) => theme.bg3};
  padding: 8px 15px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg3};
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
  }

  svg {
    color: ${({ theme }) => theme.gray500};
    font-size: ${({ theme }) => theme.fontmd};
  }

  input {
    flex-grow: 1;
    background: transparent;
    border: none;
    outline: none;
    color: ${({ theme }) => theme.text};
    font-size: ${({ theme }) => theme.fontsm};

    &::placeholder {
      color: ${({ theme }) => theme.gray500};
    }
  }
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
