export interface ISearchResult {
  _id: string
  title: string
  categories: string
  author: ISearchAuthor[]
}

export interface ISearchAuthor {
  name: string
}
