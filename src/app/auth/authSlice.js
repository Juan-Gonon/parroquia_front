import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    counter: 10,
  },
  reducers: {
    increment: (state /* action */) => {
      //! https://react-redux.js.org/tutorials/quick-start
      // Redux Toolkit allows us to write 'mutating' logic in reducers. It
      // no muta realmente el estado porque usa la biblioteca Immer,
      // que detecta cambios en un 'draft state' y produce un nuevo
      // estado inmutable basado en esos cambios
      state.counter += 1
    },
  },
})

// Los creadores de acciones se generan para cada función reductora de casos
export const { increment } = authSlice.actions
