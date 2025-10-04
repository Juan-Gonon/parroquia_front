import styled from 'styled-components'

import { useThemeStore } from '../../hook/useThemeStore'

export const EventSection = () => {
  const { theme } = useThemeStore()
  return (
    <Container $theme={theme}>
      <section className='table-content'>
        <div className='table-body'></div>
      </section>
    </Container>
  )
}

const Container = styled.main`
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.navHeight});
  margin-top: ${({ theme }) => theme.navHeight};
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};

  .table-content {
    background-color: ${({ theme }) => theme.bgtgderecha};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;

    .table-body {
      overflow-y: auto;
      padding: 20px;
    }

    .table-footer {
      background-color: ${({ theme }) => theme.bg2};
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      color: ${({ theme }) => theme.textprimary};
      border-top: 1px solid ${({ theme }) => theme.bg3};
    }
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
  gap: 20px;
  justify-content: center;
`
