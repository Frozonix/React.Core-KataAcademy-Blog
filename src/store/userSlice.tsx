/* eslint-disable consistent-return */
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { handleSubmitType } from '../types/dataTypes'

import { fetchWrapper } from './fetchWrapper'

type initType = {
  startRequest: boolean
  auth: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any
  token: string
  status: string
  error: string
  isRedirectNeeded: boolean
}

const initialState: initType = {
  startRequest: false,
  auth: false,
  userData: null,
  token: '',
  status: 'ok',
  error: '',
  isRedirectNeeded: false,
}

type regDataType = {
  username: string
  email: string
  password: string
  image: string
}
type loginDataType = {
  email: string
  password: string
}

type regRequestType = {
  user: {
    username: string
    token: string
    email: string
  }
}

type authRequestType = [regRequestType, { email: string; password: string }]

// eslint-disable-next-line
export const postReg = createAsyncThunk('user/postReg', async (data: regDataType, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/users`
  const body = { user: data }
  return fetchWrapper(url, 'POST', rejectWithValue, body)
})

export const postLogin = createAsyncThunk('user/postLogin', async (data: loginDataType, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/users/login`
  const body = { user: data }
  return fetchWrapper(url, 'POST', rejectWithValue, body, data)
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/user`
  return fetchWrapper(url, 'GET', rejectWithValue)
})

export const putUserData = createAsyncThunk('user/putUserData', async (data: handleSubmitType, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/user`
  const body = { user: data }
  return fetchWrapper(url, 'PUT', rejectWithValue, body)
})

export const postLike = createAsyncThunk('user/postLike', async (slug: string, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  return fetchWrapper(url, 'POST', rejectWithValue)
})

export const deleteLike = createAsyncThunk('user/deleteLike', async (slug: string, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  return fetchWrapper(url, 'DELETE', rejectWithValue)
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout(state) {
      state.auth = false
      state.userData = null
      localStorage.removeItem('token')
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
    toggleFirstRequest(state) {
      state.startRequest = true
    },
    clearError(state) {
      state.error = ''
    },
    toggleRedirectNeededUser(state) {
      state.isRedirectNeeded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postReg.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(postReg.fulfilled, (state, action: PayloadAction<regRequestType>) => {
      state.status = 'ok'
      state.token = action.payload.user.token
      state.error = ''
      state.isRedirectNeeded = true
      localStorage.setItem('token', action.payload.user.token)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postReg.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(postLogin.fulfilled, (state, action: PayloadAction<authRequestType>) => {
      state.auth = true
      state.userData = action.payload[0].user
      state.status = 'ok'
      state.error = ''
      state.startRequest = true
      localStorage.setItem('token', action.payload[0].user.token)
      localStorage.setItem('email', action.payload[1].email)
      localStorage.setItem('password', action.payload[1].password)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postLogin.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.startRequest = true
      state.error = action.payload
    })

    builder.addCase(getUser.fulfilled, (state) => {
      state.status = 'ok'
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(getUser.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(putUserData.fulfilled, (state, action: PayloadAction<{ user: handleSubmitType }>) => {
      state.userData = action.payload.user
      state.status = 'ok'
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(putUserData.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })
  },
})

export const { userLogout, toggleFirstRequest, clearError, toggleRedirectNeededUser } = userSlice.actions
export default userSlice.reducer
