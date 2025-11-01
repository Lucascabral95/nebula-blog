export interface ISession {
  user?: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires?: string
}

export interface IAuthUser {
  id?: string
  name?: string | null
  email?: string | null
  image?: string | null
}
