export const CREDENTIALS_CONTENT = {
  TITLE: '¡Bievenido de nuevo!',
  INSTRUCTION: 'Ingresá tus credenciales de acceso',
  EMAIL_LABEL: 'Email',
  PASSWORD_LABEL: 'Password',
  LOGIN_BTN: 'Ingresar',
  REDIRECT_URL: '/application/my-friends',
} as const

export const CREDENTIALS_ERRORS = {
  INVALID_CREDENTIALS: 'Email o contraseña inválidos. Por favor, verifica tus datos.',
  INVALID_PASSWORD: 'La contraseña es incorrecta. Inténtalo nuevamente.',
  UNEXPECTED: 'Ocurrió un error inesperado. Inténtalo más tarde.',
  SYSTEM: 'Ocurrió un error en el sistema. Inténtalo más tarde.',
} as const
