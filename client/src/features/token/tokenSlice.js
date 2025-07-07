import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tokenService from './tokenService'

// Thunk
export const refreshToken = createAsyncThunk(
  'token/refresh',
  async (_, thunkAPI) => {
    try {
      const { access_token } = await tokenService.refreshToken()
      return access_token
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.detail || err.message
      )
    }
  }
)

const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    accessToken: null,
    loading: false,
    error: null,
  },
  reducers: {
    // in case you ever need to manually set/clear
    setToken(state, action) {
      state.accessToken = action.payload
    },
    clearToken(state) {
      state.accessToken = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(refreshToken.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false
        state.accessToken = action.payload
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setToken, clearToken } = tokenSlice.actions
export default tokenSlice.reducer
