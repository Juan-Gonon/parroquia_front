import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ParishTable } from '../../features/parish-staff/parishTable'

export const ParishPage = () => {
  return (
    <Container>
      <Navbar />
      <ParishTable />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
`
