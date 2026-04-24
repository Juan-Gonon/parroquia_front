import { createSlice } from '@reduxjs/toolkit'

export const drawSlice = createSlice({
  name: 'drawSlice',
  initialState: {
    isDrawOpen: false,
  },
  reducers: {
    onOpenDraw: (state) => {
      state.isDrawOpen = true
    },
    onCloseDraw: (state) => {
      state.isDrawOpen = false
    },
  },
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { onOpenDraw, onCloseDraw } = drawSlice.actions
