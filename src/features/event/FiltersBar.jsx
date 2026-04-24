import styled from 'styled-components'
import { Search } from '../../components/Search'
import { SelectFilter } from '../../components/SelectFilter'
import { DatePicker } from '../../components/DatePicker'
import { FilterButton } from '../../components/FilterButton'

export const FiltersBar = ({
  searchValue,
  onSearchChange,
  selectValue,
  onSelectChange,
  dateValue,
  onDateChange,
  onFilter,
}) => {
  return (
    <Container>
      <Search inputChange={searchValue} handelChangeInpt={onSearchChange} />
      <SelectFilter
        value={selectValue}
        onChange={onSelectChange}
        options={[
          { value: '', label: 'Todos los tipos' },
          { value: 'evento', label: 'Evento' },
          { value: 'reunion', label: 'Reunión' },
          { value: 'taller', label: 'Taller' },
        ]}
      />
      <DatePicker value={dateValue} onChange={onDateChange} />
      <FilterButton onClick={onFilter} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.navHeight};
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
`
