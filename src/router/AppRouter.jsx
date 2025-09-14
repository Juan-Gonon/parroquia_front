/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { LoginPage } from '../page/auth/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import { useEffect } from 'react'
import { Home } from '../page/home/home'
import { DashboardPage } from '../page/dash/DashboardPage'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useThemeStore } from '../hook/useThemeStore'

export const AppRouter = () => {
  const { status, renewLogin } = useAuthStore()
  const navigate = useNavigate()
  const { themeStyle } = useThemeStore()

  useEffect(() => {
    renewLogin()
  }, [])

  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/home', { replace: true })
    }
  }, [status])

  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }
  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path='/auth/*' element={<LoginPage />}></Route>
          <Route path='/*' element={<Navigate to='/auth/login' />} />
        </>
      ) : (
        <>
          {/* Dashboard como layout */}
          <Route
            path='/'
            element={
              <ThemeProvider theme={themeStyle}>
                <DashboardPage />
              </ThemeProvider>
            }>
            {/* Rutas hijas del dashboard */}
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='productos' element={<h1>Perfil</h1>} />
            <Route path='settings' element={<h1>Ajustes</h1>} />

            {/* Redirección por defecto */}
            <Route path='/*' element={<Navigate to='/' />} />
          </Route>
        </>
      )}
    </Routes>
  )
}
