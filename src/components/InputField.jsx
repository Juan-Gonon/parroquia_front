/* eslint-disable no-unused-vars */
// InputField.jsx
import styled from 'styled-components'

export const InputField = ({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <InputGroup>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </InputGroup>
  )
}

/* STYLES */
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg2};
  padding: 10px 15px;
  border-radius: 8px;
  gap: 10px;
  transition: border 0.2s ease;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.bg4};
  }
`

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.texttertiary};
  font-size: 1.2em;
`

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  color: ${({ theme }) => theme.text};
  font-size: ${({ theme }) => theme.fontsm};
`
