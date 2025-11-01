'use client'

import { useEffect, useState, useCallback } from 'react'
import { IPost, ICategory } from '@/infrastructure/interfaces/blog.interface'
import useStore from '@/zustand'
import { blogService } from '@/infrastructure/service'

const ITEMS_PER_PAGE = 8

export const useBlog = () => {
  const { arrayDePosteos, setArrayDePosteos, search, setSearch } = useStore()
  const [categories, setCategories] = useState<ICategory[]>([])
  const [allPosts, setAllPosts] = useState<IPost[]>([])
  const [displayPosts, setDisplayPosts] = useState<IPost[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    blogService.getCategories().then(setCategories).catch(console.error)
  }, [])

  useEffect(() => {
    blogService.getPosts().then(posts => {
      setAllPosts(posts)
      setTotalPages(Math.ceil(posts.length / ITEMS_PER_PAGE))
    }).catch(console.error)
  }, [])

  useEffect(() => {
    if (arrayDePosteos.length > 0 || search) {
      setDisplayPosts(arrayDePosteos)
    } else {
      setDisplayPosts(allPosts)
    }
    setCurrentPage(1)
  }, [arrayDePosteos, allPosts, search])

  const handleCategoryClick = useCallback(async (categoryName: string) => {
    setSearch(categoryName)
    const filtered = await blogService.filterByCategory(allPosts, categoryName)
    setArrayDePosteos(filtered)
  }, [allPosts, setArrayDePosteos, setSearch])

  const handleNextPage = useCallback(() => {
    if (totalPages > currentPage) {
      setCurrentPage(currentPage + 1)
    }
  }, [currentPage, totalPages])

  const visiblePosts = displayPosts.slice(0, currentPage * ITEMS_PER_PAGE)

  return {
    categories,
    displayPosts: visiblePosts,
    search,
    currentPage,
    totalPages,
    handleCategoryClick,
    handleNextPage,
    setSearch,
  }
}
