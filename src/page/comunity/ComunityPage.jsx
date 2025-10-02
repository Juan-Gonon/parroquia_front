import styled from 'styled-components'
import { Navbar } from '../../layout/Navbar'
import { ComunitySection } from '../../features/comunity/ComunitySection'
import { ParishModal } from '../../features/parish-staff/ParishModal'
import { CommunityModal } from '../../features/comunity/CommunityModal'
import { useCommunity } from '../../hook/useCommunity'
import { useCallback } from 'react'

export const ComunityPage = () => {
  const { getAllCommunityS, community } = useCommunity()

  const refresh = useCallback(async () => {
    const res = await getAllCommunityS({ page: 1, limit: 20 })
    return res
  }, [getAllCommunityS])

  return (
    <Container>
      <Navbar>
        <h1>Comunidad de Fe</h1>
        <p>
          Donde dos o tres se reúnen en mi nombre, alli estoy yo en medio de
          ellos <br /> Mateo 18:20
        </p>
        <CommunityModal onCreated={refresh} />
      </Navbar>
      <ComunitySection refresh={refresh} data={community} />
    </Container>
  )
}

const Container = styled.section`
  min-height: 100vh;
  height: 100%;
  background: aquamarine;
  position: relative;
`
