/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import { LoginPage } from '../page/auth/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import { useEffect } from 'react'
import { Home } from '../page/home/home'
import { ProviderTheme } from '../context/ContextThem'
import { DashboardPage } from '../page/dash/DashboardPage'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

export const AppRouter = () => {
  const { status, renewLogin } = useAuthStore()
  const navigate = useNavigate()

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
              <ProviderTheme>
                <DashboardPage />
              </ProviderTheme>
            }>
            {/* Rutas hijas del dashboard */}
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='profile' element={<h1>Perfil</h1>} />
            <Route path='settings' element={<h1>Ajustes</h1>} />

            {/* Redirección por defecto */}
            <Route path='*' element={<Navigate to='home' />} />
          </Route>
        </>
      )}
    </Routes>
  )
}
