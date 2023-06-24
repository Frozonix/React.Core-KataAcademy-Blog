import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { articleType } from '../types/dataTypes'

import { fetchWrapper } from './fetchWrapper'

type postArticle = {
  title: string
  description: string
  body: string
  tagList: string[] | undefined
}

type payload = {
  article: articleType
}

type initArticleType = {
  data: articleType | null
  status: string
  error: string
  isRedirectNeeded: boolean
}
const initialState: initArticleType = {
  data: null,
  status: 'loading',
  error: '',
  isRedirectNeeded: false,
}

// eslint-disable-next-line
export const getArticle = createAsyncThunk(
  'article/getArticle',
  // eslint-disable-next-line
  async (slug: string | undefined, { rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`
    return fetchWrapper(url, 'GET', rejectWithValue)
  }
)
// eslint-disable-next-line
export const postArticle = createAsyncThunk(
  'article/postArticle',
  // eslint-disable-next-line consistent-return
  async (data: postArticle, { rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles`
    const body = { article: data }
    return fetchWrapper(url, 'POST', rejectWithValue, body)
  }
)

// eslint-disable-next-line
export const putArticle = createAsyncThunk(
  'article/putArticle',
  // eslint-disable-next-line
  async (data: [unknown, string], { rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles/${data[1]}`
    const body = { article: data[0] }
    return fetchWrapper(url, 'PUT', rejectWithValue, body)
  }
)

// eslint-disable-next-line
export const deleteArticle = createAsyncThunk(
  'article/deleteArticle',
  // eslint-disable-next-line
  async (slug: string, { rejectWithValue }) => {
    const url = `https://blog.kata.academy/api/articles/${slug}`
    return fetchWrapper(url, 'DELETE', rejectWithValue)
  }
)

const articleSlice = createSlice({
  name: 'article_item',
  initialState,
  reducers: {
    toggleRedirectNeeded(state) {
      state.isRedirectNeeded = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticle.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(getArticle.fulfilled, (state, action: PayloadAction<payload>) => {
      state.status = 'ok'
      state.data = action.payload.article
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(getArticle.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(postArticle.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(postArticle.fulfilled, (state) => {
      state.status = 'ok'
      state.error = ''
      state.isRedirectNeeded = true
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(postArticle.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(putArticle.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(putArticle.fulfilled, (state) => {
      state.status = 'ok'
      state.error = ''
      state.isRedirectNeeded = true
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(putArticle.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })

    builder.addCase(deleteArticle.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(deleteArticle.fulfilled, (state) => {
      state.status = 'ok'
      state.error = ''
    })
    /* eslint-disable-next-line */
    // @ts-expect-error
    builder.addCase(deleteArticle.rejected, (state, action: PayloadAction<string>) => {
      state.status = 'rejected'
      state.error = action.payload
    })
  },
})

export const { toggleRedirectNeeded } = articleSlice.actions
export default articleSlice.reducer
