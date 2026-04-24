import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { Search } from '../../components/Search'
import { MinistersTable } from '../../features/ministers/MinistersTable'
import { useMinisters } from '../../hook/useMinisters'
import { MinistersModal } from '../../features/ministers/MinistersModal'

export const MinistersPage = () => {
  const { ministers, getAllMinisters, pagination } = useMinisters()
  const [inputChange, setInputChange] = useState('')

  const refresh = useCallback(async () => {
    const res = await getAllMinisters({ page: 1, limit: 10 })
    return res
  }, [getAllMinisters])

  const handleNextPage = () => {
    if (pagination.next) {
      getAllMinisters({ page: pagination.page + 1, limit: pagination.limit })
    }
  }

  const handlePrevPage = () => {
    if (pagination.prev) {
      getAllMinisters({ page: pagination.page - 1, limit: pagination.limit })
    }
  }

  const handelChangeInpt = (e) => {
    setInputChange(e.target.value)
  }
  return (
    <Container>
      <Navbar textBtn='Crear nuevo Ministro'>
        <ContentContainer>
          <Title>Ministros</Title>
          <Citation>
            "El señor es mi pastor, name me falta." <br /> (Salmo 23:1)
          </Citation>
        </ContentContainer>
        <Search value={inputChange} handelChangeInpt={handelChangeInpt} />
        <MinistersModal onCreated={refresh} />
      </Navbar>
      <MinistersTable
        refresh={refresh}
        data={ministers}
        pagination={pagination}
        onNextPage={handleNextPage}
        onPrevPage={handlePrevPage}
        filteringValue={inputChange}
        setFiltering={setInputChange}
      />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* margin-right: auto; */
  padding: 0 10px;
  align-items: center;
`

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  /* font-style: italic; */
`

const Citation = styled.p`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.gray400};
  margin: 0;
  padding-top: 5px;
  font-weight: 600;
  font-style: italic;
`
