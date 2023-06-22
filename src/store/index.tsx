import { configureStore } from '@reduxjs/toolkit'

import allArticlesReducer from './allArticlesSlice'
import articleReducer from './articleSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    articles: allArticlesReducer,
    article: articleReducer,
    user: userReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type appDispatch = typeof store.dispatch
