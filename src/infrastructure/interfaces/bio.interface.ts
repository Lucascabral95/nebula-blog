export interface IBioData {
  nombreCompleto: string
  pronombres: string
  edad: number | null
  bio: string
}

export interface IBioLengths {
  lengthNombreCompleto: number
  lengthPronombres: number
  lengthBio: number
}

export interface IRegisterData {
  name: string
  email: string
  password: string
}
