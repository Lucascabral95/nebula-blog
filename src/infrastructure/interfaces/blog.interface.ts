export interface IPost {
  _id: string
  title: string
  content: string
  categories: string
  createdAt: string
  likes: number
  comments: IComment[]
  author?: any
}

export interface IComment {
  _id: string
}

export interface ICategory {
  _id: string
  name: string
}
