import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { Search } from '../../components/Search'
import { MinistersTable } from '../../features/ministers/MinistersTable'
import { useMinisters } from '../../hook/useMinisters'

export const MinistersPage = () => {
  const { ministers, getAllMinisters } = useMinisters()

  const refresh = useCallback(async () => {
    const res = await getAllMinisters({ page: 1, limit: 10 })
    return res
  }, [getAllMinisters])
  return (
    <Container>
      <Navbar textBtn='Crear nuevo Ministro'>
        <Search />
      </Navbar>
      <MinistersTable refresh={refresh} data={ministers} />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
`
