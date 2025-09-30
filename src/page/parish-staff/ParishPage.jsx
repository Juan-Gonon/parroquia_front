import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ParishTable } from '../../features/parish-staff/parishTable'
import { ParishModal } from '../../features/parish-staff/ParishModal'
import { useParishService } from '../../hook/useParishService'
import { Search } from '../../components/Search'

export const ParishPage = () => {
  const { getAllParish, parish, pagination } = useParishService()
  const [inputChange, setInputChange] = useState('')

  const refresh = useCallback(async () => {
    const res = await getAllParish({ page: 1, limit: 10 })
    return res
  }, [getAllParish])

  const handleNextPage = () => {
    if (pagination.next) {
      getAllParish({ page: pagination.page + 1, limit: pagination.limit })
    }
  }

  const handlePrevPage = () => {
    if (pagination.prev) {
      getAllParish({ page: pagination.page - 1, limit: pagination.limit })
    }
  }

  const handelChangeInpt = (e) => {
    setInputChange(e.target.value)
  }

  return (
    <Container>
      <Navbar>
        <Search value={inputChange} handelChangeInpt={handelChangeInpt} />
        <ParishModal onCreated={refresh} />
      </Navbar>
      <ParishTable
        refresh={refresh}
        data={parish}
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
