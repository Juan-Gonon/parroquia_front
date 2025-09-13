import { useContext } from 'react'
import { Sidebar } from '../../layout/Sidebar'
import { ThemeContext } from '../../context/ContextThem'
import { Outlet } from 'react-router'
import styled from 'styled-components'

export const DashboardPage = () => {
  const { sidebarOpen } = useContext(ThemeContext)
  return (
    <DashboardWrapper>
      <Container className={`sidebarState ${sidebarOpen ? 'active' : ''}`}>
        <Sidebar />
        <Outlet />
      </Container>
    </DashboardWrapper>
  )
}

const DashboardWrapper = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
`

const Container = styled.main`
  display: grid;
  grid-template-columns: 90px auto;
  background: ${({ theme }) => theme.bgtotal};
  transition: grid-template-columns 0.35s;
  color: ${({ theme }) => theme.text};
  /* height: 100vh; */
  min-height: 100vh;
  /* padding: 5px; */
  gap: 10px;
  &.active {
    grid-template-columns: 300px auto;
  }
`
