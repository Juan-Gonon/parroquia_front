/* eslint-disable prettier/prettier */

import { createContext, useState } from 'react'
import { Dark, Light } from '../styles/Themes'
import { ThemeProvider } from 'styled-components'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext()

export function ProviderTheme({ children }) {
  const [theme, setTheme] = useState('light')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const themeStyle = theme === 'light' ? Light : Dark

  const changeTheme = () => {
    setTheme((prevThem) => (prevThem === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        sidebarOpen,
        setSidebarOpen,
      }}>
      <ThemeProvider theme={themeStyle}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}
