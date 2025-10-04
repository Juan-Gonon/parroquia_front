import styled from 'styled-components'

export const DatePicker = ({ value, onChange }) => {
  return (
    <DateInput
      type='date'
      value={value}
      onChange={onChange}
      placeholder='dd/mm/aaaa'
    />
  )
}

const DateInput = styled.input`
  background-color: ${({ theme }) => theme.bg3};
  border: 1px solid ${({ theme }) => theme.bg3};
  border-radius: 8px;
  padding: 8px 12px;
  font-size: ${({ theme }) => theme.fontsm};
  color: ${({ theme }) => theme.text};
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: ${({ theme }) => theme.gray500};
  }

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`
