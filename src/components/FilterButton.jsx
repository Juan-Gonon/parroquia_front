import styled from 'styled-components'
import { MdFilterList } from 'react-icons/md'

export const FilterButton = ({ onClick, text = 'Filtrar' }) => {
  return (
    <Button onClick={onClick}>
      <MdFilterList />
      <span>{text}</span>
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontsm};
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    font-size: 1.2em;
  }
`
