import { createSlice } from '@reduxjs/toolkit'
import { Dark, Light } from '../../styles/Themes'

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'light',
    sidebarOpen: true,
    themeStyle: Light,
  },
  reducers: {
    toggleTheme: (state) => {
      // Cambia el tema y actualiza themeStyle
      if (state.theme === 'light') {
        state.theme = 'dark'
        state.themeStyle = Dark
      } else {
        state.theme = 'light'
        state.themeStyle = Light
      }
    },
    setSidebarOpen: (state, { payload }) => {
      state.sidebarOpen = payload
    },
  },
})

// Exportamos los actions para usarlos con dispatch
export const { toggleTheme, setSidebarOpen } = themeSlice.actions
