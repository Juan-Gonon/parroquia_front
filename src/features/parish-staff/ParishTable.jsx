import styled from 'styled-components'
import { useThemeStore } from '../../hook/useThemeStore'
import { useEffect } from 'react'
import { useParishService } from '../../hook/useParishService'
import { TableC } from '../../components/TableC'

export const ParishTable = () => {
  const { theme } = useThemeStore()
  const { getAllParish, parish } = useParishService()

  // console.log(parish)

  useEffect(() => {
    getAllParish({
      page: 1,
      limit: 10,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parish])

  return (
    <Container $themeUse={theme}>
      <section className='table-content'>
        <div className='table-body'>
          <TableC data={parish} />
        </div>
        <div className='table-footer'>
          <h1>Footer</h1>
        </div>
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
