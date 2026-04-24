import React from 'react'
import styled from 'styled-components'
import { CommunityCard } from '../../components/CommunityCard'

export const ContentComunity = ({ data }) => {
  return (
    <CardsGrid>
      {data.map((community) => (
        <CommunityCard key={community.id_comunidad} community={community} />
      ))}
    </CardsGrid>
  )
}

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  gap: 20px;
  justify-content: center;
`
