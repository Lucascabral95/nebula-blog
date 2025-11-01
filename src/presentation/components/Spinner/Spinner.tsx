'use client'

import './loading-spinner.scss'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
}

export const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  return (
    <div className="loading-spinner-overlay">
      <div className={`loading-spinner loading-spinner--${size}`} />
    </div>
  )
}
