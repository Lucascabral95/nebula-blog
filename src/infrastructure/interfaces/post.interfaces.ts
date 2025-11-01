export interface IIPost {
  _id: string
  title: string
  content: string
  categories: string
  createdAt: string
  likes: number
  comments: IIComment[]
}

export interface IIComment {
  _id: string
}

export interface IIUser {
  _id: string
  name: string
}

export interface IPostDetail {
  post: IIPost
  user: IIUser
}
