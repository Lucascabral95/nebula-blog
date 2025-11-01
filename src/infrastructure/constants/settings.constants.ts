export const SETTINGS_MENU = [
  {
    id: 'profile',
    label: 'Perfil',
    icon: 'user',
    href: (userId: string) => `/blog/mi-perfil/${userId}`,
  },
  {
    id: 'publications',
    label: 'Mis publicaciones',
    icon: 'newspaper',
    href: (userId: string) => `/blog/mi-perfil/${userId}/ajustes/publicaciones`,
  },
  {
    id: 'saved',
    label: 'Publicaciones guardadas',
    icon: 'save',
    href: (userId: string) => `/blog/mi-perfil/${userId}/ajustes/publicacionesguardadas`,
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: 'stats',
    href: (userId: string) => `/blog/mi-perfil/${userId}/ajustes/cuenta`,
  },
] as const

export const LOGOUT_TEXT = 'Cerrar sesión'
