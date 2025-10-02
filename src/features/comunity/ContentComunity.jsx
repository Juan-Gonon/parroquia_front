import React from 'react'
import styled from 'styled-components'
import { CommunityCard } from '../../components/CommunityCard'

const mockCommunities = [
  {
    id_comunidad: 1,
    nombre: 'San Pedro',
    direccion: 'Calle Principal, 123, Villa Esperanza',
    telefono: '+1-555-123-4567',
    email: 'sanpedro@example.com',
    id_Parroquia: 1,
  },
  {
    id_comunidad: 2,
    nombre: 'Santa María del Sol',
    direccion: 'Av. Los Libertadores, 50, Sector Central',
    telefono: '+1-555-987-6543',
    email: 'santamaria@example.com',
    id_Parroquia: 1,
  },
  {
    id_comunidad: 3,
    nombre: 'Santa María del Sol',
    direccion: 'Av. Los Libertadores, 50, Sector Central',
    telefono: '+1-555-987-6543',
    email: 'santamaria@example.com',
    id_Parroquia: 1,
  },
  // ... más comunidades
]

export const ContentComunity = () => {
  return (
    <CardsGrid>
      {mockCommunities.map((community) => (
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
