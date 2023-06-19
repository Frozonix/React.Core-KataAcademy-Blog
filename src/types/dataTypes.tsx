export type authorType = {
  following: false
  image: string
  username: string
}

export type articleType = {
  author: authorType
  body: string
  createdAt: string
  description: string
  favorited: false
  favoritesCount: boolean
  slug: string
  tagList: string[]
  title: string
  updatedAt: string
}

export type dataType = {
  articles: articleType[]
  articlesCount: number
}

export type initType = {
  data: dataType
  status: string
  error: string
}
