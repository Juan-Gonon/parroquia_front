import { IoIosSearch } from 'react-icons/io'
import styled from 'styled-components'

export const Search = () => {
  return (
    <SearchSection>
      <SearchInputContainer>
        <IoIosSearch />
        <input type='text' placeholder='Buscar personal...' />
      </SearchInputContainer>
    </SearchSection>
  )
}

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
