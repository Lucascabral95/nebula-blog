'use client'

import { useEffect, useState } from 'react'
import { IProfileBio, IProfileAddress, IProfileDetails } from '@/infrastructure/interfaces/profile.interface'
import { profileService } from '@/infrastructure/service'

export const useProfile = (userId: string | null) => {
  const [bio, setBio] = useState<IProfileBio>({ bio: '' })
  const [address, setAddress] = useState<IProfileAddress | null>(null)
  const [details, setDetails] = useState<IProfileDetails | null>(null)

  useEffect(() => {
    if (!userId) return

    const loadProfileData = async () => {
      try {
        const [bioData, addressData, detailsData] = await Promise.all([
          profileService.getBio(userId),
          profileService.getAddress(userId),
          profileService.getDetails(userId),
        ])
        setBio(bioData)
        setAddress(addressData)
        setDetails(detailsData)
      } catch (error) {
        console.error('Error al cargar perfil:', error)
      }
    }

    loadProfileData()
  }, [userId])

  return { bio, address, details }
}
