/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { LoginPage } from '../page/auth/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import { useEffect } from 'react'
import { DashboardPage } from '../page/dash/DashboardPage'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { useThemeStore } from '../hook/useThemeStore'
import { Home } from '../page/home/Home'

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
            <Route path='parish-staff' element={<h1>personal</h1>} />
            <Route path='communities' element={<h1>comunidad</h1>} />
            <Route path='event' element={<h1>Eventos</h1>} />
            <Route path='comunity-leader' element={<h1>Lider</h1>} />
            <Route path='feligreses' element={<h1>Feligres</h1>} />
            <Route path='intention' element={<h1>intencion</h1>} />
            <Route path='ministry' element={<h1>ministerio</h1>} />
            <Route path='liturgy-turns' element={<h1>liturgia</h1>} />
            <Route path='service-group' element={<h1>grupos</h1>} />

            {/* Redirección por defecto */}
            <Route path='/*' element={<Navigate to='/' />} />
          </Route>
        </>
      )}
    </Routes>
  )
}
