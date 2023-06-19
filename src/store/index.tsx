import { configureStore } from '@reduxjs/toolkit'

import allArticlesReducer from './allArticlesSlice'
import articleReducer from './articleSlice'

const store = configureStore({
  reducer: {
    articles: allArticlesReducer,
    article: articleReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch
