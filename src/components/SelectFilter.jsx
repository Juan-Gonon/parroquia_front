import styled from 'styled-components'

export const SelectFilter = ({ options, value, onChange }) => {
  return (
    <SelectContainer>
      <select value={value} onChange={onChange}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </SelectContainer>
  )
}

const SelectContainer = styled.div`
  select {
    background-color: ${({ theme }) => theme.bg3};
    border: 1px solid ${({ theme }) => theme.bg3};
    border-radius: 8px;
    padding: 8px 12px;
    font-size: ${({ theme }) => theme.fontsm};
    color: ${({ theme }) => theme.text};
    outline: none;
    cursor: pointer;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: ${({ theme }) => theme.primary};
    }
  }
`
