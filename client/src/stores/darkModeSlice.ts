import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DarkModeState {
  isEnabled: boolean
}

const initialState: DarkModeState = {
  isEnabled: true
}

export const styleSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<boolean | null>) => {
      state.isEnabled = action.payload !== null ? action.payload : !state.isEnabled

      if (typeof document !== 'undefined') {
        document.body.classList[state.isEnabled ? 'add' : 'remove']('dark-scrollbars')

        document.documentElement.classList[state.isEnabled ? 'add' : 'remove'](
          'dark',
          'dark-scrollbars-compat'
        )
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDarkMode } = styleSlice.actions

export default styleSlice.reducer
