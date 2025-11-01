'use client'

import { useEffect, useState } from 'react'
import useStore from '@/zustand'

const MOBILE_BREAKPOINT = 554

export const useResponsive = () => {
  const { setIsOpenSearchFull } = useStore()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= MOBILE_BREAKPOINT
      setIsMobile(isNowMobile)
      if (!isNowMobile) setIsOpenSearchFull(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsOpenSearchFull])

  return { isMobile }
}
