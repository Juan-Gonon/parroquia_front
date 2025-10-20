import React from 'react'
import { MdAdd } from 'react-icons/md'
import styled from 'styled-components'

export const AddButtonC = ({ textBtn, handleClick, disabled }) => {
  return (
    <AddButton onClick={handleClick} disabled={disabled}>
      <MdAdd />
      <span>{textBtn}</span>
    </AddButton>
  )
}

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
