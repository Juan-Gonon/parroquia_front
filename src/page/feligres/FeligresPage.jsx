import { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { Search } from '../../components/Search'
import { FeligresTable } from '../../features/feligres/FeligresTable'
import { FeligresModal } from '../../features/feligres/FeligresModal'
import { useFeligres } from '../../hook/useFeligres'

export const FeligresPage = () => {
  const { feligreses, getAllFeligres, pagination } = useFeligres()
  const [inputChange, setInputChange] = useState('')

  const refresh = useCallback(async () => {
    const res = await getAllFeligres({ page: 1, limit: 10 })
    return res
  }, [getAllFeligres])

  const handleNextPage = () => {
    if (pagination.next) {
      getAllFeligres({ page: pagination.page + 1, limit: pagination.limit })
    }
  }

  const handlePrevPage = () => {
    if (pagination.prev) {
      getAllFeligres({ page: pagination.page - 1, limit: pagination.limit })
    }
  }

  const handleChangeInput = (e) => {
    setInputChange(e.target.value)
  }

  return (
    <Container>
      <Navbar textBtn='Registrar nuevo Feligrés'>
        <ContentContainer>
          <Title>Feligrés</Title>
          <Citation>
            “Ama a tu prójimo como a ti mismo.” <br /> (Mateo 22:39)
          </Citation>
        </ContentContainer>

        <Search value={inputChange} handelChangeInpt={handleChangeInput} />
        <FeligresModal onCreated={refresh} />
      </Navbar>

      <FeligresTable
        refresh={refresh}
        data={feligreses}
        pagination={pagination}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        filteringValue={inputChange}
        setFiltering={setInputChange}
      />
    </Container>
  )
}

/* ==================== STYLES ==================== */
const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.bgtgderecha};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`

const Citation = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray400};
  margin: 0;
  padding-top: 5px;
  font-weight: 600;
  font-style: italic;
`
