export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  LOGIN: '/',
} as const

export const NOT_FOUND_MESSAGES = {
  UNAUTHENTICATED: 'Inicia sesión',
  AUTHENTICATED: 'Ir a la página principal',
  TITLE: '404 - Página no encontrada',
} as const

export const IMAGES = {
  NOT_FOUND: '/img/bad-request.jpg',
} as const
