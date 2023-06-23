/* eslint-disable consistent-return */
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { dataType } from '../types/dataTypes'

type initType = {
  startRequest: boolean
  auth: boolean
  userData: any
  token: string
  status: string
  error: string
}

const initialState: initType = {
  startRequest: false,
  auth: false,
  userData: null,
  token: '',
  status: 'ok',
  error: '',
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
  try {
    const responce = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

export const postLogin = createAsyncThunk('user/postLogin', async (data: loginDataType, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/users/login`
  const body = { user: data }
  const token = localStorage.getItem('token')
  try {
    const responce = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }

    const outputData = await responce.json()
    return [outputData, data]
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

export const getUser = createAsyncThunk('user/getUser', async (_, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/user`
  const token = localStorage.getItem('token')
  try {
    const responce = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

export const putUserData = createAsyncThunk('user/putUserData', async (data: any, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/user`
  const body = { user: data }
  const token = localStorage.getItem('token')
  try {
    const responce = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

export const postLike = createAsyncThunk('user/postLike', async (slug: string, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  const token = localStorage.getItem('token')
  try {
    const responce = await fetch(url, {
      method: 'POST',
      //  body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

export const deleteLike = createAsyncThunk('user/deleteLike', async (slug: string, { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`
  const token = localStorage.getItem('token')
  try {
    const responce = await fetch(url, {
      method: 'DELETE',
      //  body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token || ''}`,
      },
    })
    if (!responce.ok) {
      throw new Error(`Server Error: ${responce.status}`)
    }
    const outputData = await responce.json()
    return outputData
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message.toString())
    }
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout(state) {
      state.auth = false
      state.userData = null
      localStorage.removeItem('email')
      localStorage.removeItem('password')
    },
    toggleFirstRequest(state) {
      state.startRequest = true
    },
    clearError(state) {
      state.error = ''
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
      localStorage.setItem('token', action.payload.user.token)

      console.log(state.token)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postReg.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(postLogin.pending, (state) => {
      state.status = 'loading'
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postLogin.fulfilled, (state, action: PayloadAction<authRequestType>) => {
      state.auth = true
      state.userData = action.payload[0].user
      state.status = 'ok'
      state.error = ''
      state.startRequest = true
      localStorage.setItem('token', action.payload[0].user.token)
      localStorage.setItem('email', action.payload[1].email)
      localStorage.setItem('password', action.payload[1].password)
      console.log('auth response:', action.payload)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postLogin.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.startRequest = true
      state.error = action.payload
      console.log(action.payload)
    })

    builder.addCase(getUser.pending, (state) => {
      // state.status = 'loading'
    })
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'ok'
      state.error = ''
      console.log('get current user:', action.payload)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(getUser.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(putUserData.pending, (state) => {
      // state.status = 'loading'
    })
    builder.addCase(putUserData.fulfilled, (state, action: PayloadAction<any>) => {
      state.userData = action.payload.user
      state.status = 'ok'
      state.error = ''
      console.log(action.payload)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(putUserData.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(postLike.pending, (state) => {
      // state.status = 'loading'
    })
    builder.addCase(postLike.fulfilled, (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postLike.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(deleteLike.pending, (state) => {
      // state.status = 'loading'
    })
    builder.addCase(deleteLike.fulfilled, (state, action: PayloadAction<any>) => {
      console.log(action.payload)
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(deleteLike.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })
  },
})

// export const { allTickets, notAllTickets } = ticketsSlice.actions
export const { userLogout, toggleFirstRequest, clearError } = userSlice.actions
export default userSlice.reducer

// import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// import { dataObj } from '../types/dataType'

// // eslint-disable-next-line
// export const getData = createAsyncThunk('tickets/getData', async (counter: number, { rejectWithValue }) => {
//   const getUrl = await (await fetch('https://aviasales-test-api.kata.academy/search')).json()
//   const url = `https://aviasales-test-api.kata.academy/tickets?searchId=${getUrl.searchId}`

//   try {
//     if (counter < 3) {
//       const responce = await fetch(url)
//       if (!responce.ok) {
//         throw new Error(`Server Error: ${responce.status}`)
//       }
//       const data = await responce.json()
//       return data
//     }
//     throw new Error(`Server Error!`)
//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       return rejectWithValue([err.message, counter])
//     }
//   }
// })

// type data = {
//   tickets: dataObj[] | []
//   stop: boolean
// }

// type init = {
//   initData: dataObj[] | []
//   data: data
//   status: string
//   error: string | Error
// }

// const initialState: init = {
//   initData: [],
//   data: { tickets: [], stop: false },
//   status: 'loading',
//   error: '',
// }

// const ticketsSlice = createSlice({
//   name: 'tickets',
//   initialState,
//   reducers: {
//     allTickets(state, action: PayloadAction<[[boolean, boolean, boolean, boolean, boolean], number]>) {
//       const [filterState, active] = action.payload
//       if (filterState[0] === true) {
//         const array = [...state.initData]
//         if (active === 0) {
//           state.data.tickets = activeFirstTab(array)
//         } else if (active === 1) {
//           state.data.tickets = activeSecondTab(array)
//         }
//       }
//     },
//     notAllTickets(state, action: PayloadAction<[[boolean, boolean, boolean, boolean, boolean], number]>) {
//       const [filterState, active] = action.payload
//       /* eslint-disable */
//       function length_0(x: dataObj) {
//         if (filterState[1]) return x.segments[0].stops.length === 0
//       }
//       function length_1(x: dataObj) {
//         if (filterState[2]) return x.segments[0].stops.length === 1
//       }
//       function length_2(x: dataObj) {
//         if (filterState[3]) return x.segments[0].stops.length === 2
//       }
//       function length_3(x: dataObj) {
//         if (filterState[4]) return x.segments[0].stops.length === 3
//       }
//       /* eslint-enable */
//       let array = [...state.initData]
//       array = array.filter((item) => length_0(item) || length_1(item) || length_2(item) || length_3(item))

//       if (active === 0) {
//         state.data.tickets = activeFirstTab(array)
//       } else if (active === 1) {
//         state.data.tickets = activeSecondTab(array)
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(getData.pending, (state) => {
//       state.status = 'loading'
//     })
//     builder.addCase(getData.fulfilled, (state, action: PayloadAction<data>) => {
//       state.status = 'ok'
//       state.data = action.payload
//       state.initData = action.payload.tickets
//       state.error = ''
//     })
//     /* eslint-disable-next-line */
//     // @ts-expect-error
//     builder.addCase(getData.rejected, (state, action: PayloadAction<[string, number]>) => {
//       if (action.payload[1] >= 2) {
//         state.status = 'rejected'
//       } else {
//         state.status = 'loading'
//       }
//       if (typeof action.payload[0] === 'string') {
//         state.error = `${action.payload[0]} :: ${action.payload[1]}`
//       }
//     })
//   },
// })

// function activeFirstTab(array: dataObj[]) {
//   return array.sort((a: dataObj, b: dataObj) => a.price - b.price)
// }
// function activeSecondTab(array: dataObj[]) {
//   return array.sort((a: dataObj, b: dataObj) => a.segments[0].duration - b.segments[0].duration)
// }

// export const { allTickets, notAllTickets } = ticketsSlice.actions
// export default ticketsSlice.reducer
