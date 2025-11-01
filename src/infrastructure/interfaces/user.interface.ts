export interface IUserProfile {
  _id: string
  name: string
  email: string
  createdAt: string
}

export interface IUserProfileResponse {
  posts: IProfilePost[]
  user: IUserProfile[]
}

export interface IProfilePost {
  _id: string
  title: string
  content: string
  categories: string
  createdAt: string
  likes: number
  comments: IProfileComment[]
  author: IUserProfile[]
}

export interface IProfileComment {
  _id: string
}
