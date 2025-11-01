'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import useStore from '@/zustand'
import { ISearchResult } from '@/infrastructure/interfaces/search.interface'
import { searchService } from '@/infrastructure/service'

export const useSearch = () => {
  const { search, setSearch, setArrayDePosteos } = useStore()
  const [results, setResults] = useState<ISearchResult[]>([])
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    if (search === '') {
      setResults([])
      setArrayDePosteos([])
      setIsOpenMenu(false)
    }
  }, [search, setArrayDePosteos])

  useEffect(() => {
    const performSearch = async () => {
      if (!search) return
      try {
        const posts = await searchService.getAllPosts()
        const filtered = searchService.filterPosts(posts, search)
        setResults(filtered)
        setArrayDePosteos(filtered)
      } catch (error) {
        console.error('Error en búsqueda:', error)
      }
    }

    performSearch()
  }, [search, setArrayDePosteos])

  const shouldShowResults = pathName !== '/blog' && results.length > 0 && search !== ''

  return {
    search,
    setSearch,
    results,
    isOpenMenu,
    setIsOpenMenu,
    shouldShowResults,
  }
}
