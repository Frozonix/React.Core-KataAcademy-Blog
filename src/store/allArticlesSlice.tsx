import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { dataType, initType } from '../types/dataTypes'

const initialState: initType = {
  data: { articles: [], articlesCount: 0 },
  status: 'loading',
  error: '',
}

// eslint-disable-next-line
export const getData = createAsyncThunk('articles/getData', async (data: [number, boolean], { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles?limit=20&offset=${data[0] * 20 - 20}`
  const token = data[1] ? localStorage.getItem('token') : ''
  try {
    const responce = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
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

const allArticlesSlice = createSlice({
  name: 'allArticles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<dataType>) => {
      state.status = 'ok'
      state.data = action.payload
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(getData.rejected, (state, action: PayloadAction<string>) => {
      state.error = action.payload
    })
  },
})

export default allArticlesSlice.reducer
