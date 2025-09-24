import React, { useCallback } from 'react'
import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ParishTable } from '../../features/parish-staff/parishTable'
import { ParishModal } from '../../features/parish-staff/ParishModal'
import { useParishService } from '../../hook/useParishService'

export const ParishPage = () => {
  const { getAllParish, parish } = useParishService()

  const refresh = useCallback(async () => {
    const res = await getAllParish({ page: 1, limit: 10 })
    return res
  }, [getAllParish]) // depende solo de getAllParish

  return (
    <Container>
      <Navbar>
        <ParishModal onCreated={refresh} />
      </Navbar>
      <ParishTable refresh={refresh} data={parish} />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  /* background: aquamarine; */
  position: relative;
`
