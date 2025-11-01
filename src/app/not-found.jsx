'use client'

import EstructuraCuerpo from '@/components/EstructuraCuerpo/EstructuraCuerpo'
import { NotFoundContent } from '@/presentation/components/NotFoundContent'
import { LoadingSpinner } from '@/presentation/components/Spinner/Spinner'
import { useAuth } from '@/presentation/hooks/useAuth'

const PageNotFound = () => {
  const { isAuthenticated, isLoading, getRedirectPath, getButtonText } = useAuth()

  if (isLoading) {
    return (
      <LoadingSpinner /> 
    )
  }

  const content = (
    <NotFoundContent
      redirectPath={getRedirectPath()} 
      buttonText={getButtonText()} 
    />
  )

  return isAuthenticated ? (
    <EstructuraCuerpo>
      {content}
    </EstructuraCuerpo>
  ) : (
    content
  )
}

export default PageNotFound
