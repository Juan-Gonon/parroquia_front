import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    isModelOpen: false,
  },
  reducers: {
    onOpenModal: (state) => {
      state.isModelOpen = true
    },
    onCloseModal: (state) => {
      state.isModelOpen = false
    },
  },
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { onOpenModal, onCloseModal } = modalSlice.actions
