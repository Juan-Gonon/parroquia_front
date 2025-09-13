/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { LoginPage } from '../page/auth/LoginPage'
import { useAuthStore } from '../hook/useAuthStore'
import { useEffect } from 'react'

export const AppRouter = () => {
  const { status, renewLogin } = useAuthStore()

  useEffect(() => {
    renewLogin()
  }, [])

  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }
  return (
    <BrowserRouter>
      <Routes>
        {status === 'not-authenticated' ? (
          <>
            <Route path='/auth/*' element={<LoginPage />}></Route>
            <Route path='/*' element={<Navigate to='/auth/login' />} />
          </>
        ) : (
          <>
            <Route path='/' element={<DashboardPage />}></Route>
            <Route path='/*' element={<Navigate to='/' />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  )
}
