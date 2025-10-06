import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { Search } from '../../components/Search'
import { MinistersTable } from '../../features/ministers/MinistersTable'

export const MinistersPage = () => {
  return (
    <Container>
      <Navbar textBtn='Crear nuevo Ministro'>
        <Search />
      </Navbar>
      <MinistersTable />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
`
