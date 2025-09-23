import { createSlice } from '@reduxjs/toolkit'

export const drawSlice = createSlice({
  name: 'drawSlice',
  initialState: {
    isDrawOpen: false,
  },
  reducers: {
    onOpenDraw: (state) => {
      state.isModelOpen = true
    },
    onCloseDraw: (state) => {
      state.isModelOpen = false
    },
  },
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { onOpenDraw, onCloseDraw } = drawSlice.actions
