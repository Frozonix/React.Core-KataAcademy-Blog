import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { dataType, initType } from '../types/dataTypes'

import { fetchWrapper } from './fetchWrapper'

const initialState: initType = {
  data: { articles: [], articlesCount: 0 },
  status: 'loading',
  error: '',
}

// eslint-disable-next-line
export const getData = createAsyncThunk('articles/getData', async (data: [number, boolean], { rejectWithValue }) => {
  const url = `https://blog.kata.academy/api/articles?limit=20&offset=${data[0] * 20 - 20}`
  return fetchWrapper(url, 'GET', rejectWithValue)
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
