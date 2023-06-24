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
  favorited: boolean
  favoritesCount: number
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

export type handleSubmitType = {
  [key: string]: string
}

export type handleSubmitTypeTags = {
  [key: string]: string | { tag: string }[] | []
}
