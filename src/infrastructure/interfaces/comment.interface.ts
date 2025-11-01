export interface ItemComment {
  _id: string
  content: string
  createdAt: string
  likes: number
  user: ItemComment[]
}

export interface ItemCommentUser {
  _id: string
  name: string
  image: string
}
