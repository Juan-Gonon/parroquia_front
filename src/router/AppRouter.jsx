import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { DashboardPage } from '../features/dashboard/DashboardPage'
import { LoginPage } from '../page/auth/LoginPage'
export const AppRouter = () => {
  const [status] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        {status ? (
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
