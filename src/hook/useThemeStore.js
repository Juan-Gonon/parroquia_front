import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarOpen, toggleTheme } from '../app/Theme/themeSlice'

export const useThemeStore = () => {
  const { theme, sidebarOpen, themeStyle } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const starToogle = () => {
    dispatch(toggleTheme())
  }

  const openSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen))
  }

  return {
    theme,
    sidebarOpen,
    themeStyle,
    starToogle,
    openSidebar,
  }
}
