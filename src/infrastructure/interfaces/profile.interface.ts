export interface IProfileBio {
  bio: string
}

export interface IProfileAddress {
  partido: string
  provincia: string
  pais: string
}

export interface IProfileDetails {
  email: string
  github: string
  linkeding: string
}

export interface IProfileData {
  bio: IProfileBio
  address: IProfileAddress
  details: IProfileDetails
}
