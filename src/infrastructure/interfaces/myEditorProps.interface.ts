export interface MyEditorProps {
  titulo: string
  setTitulo: (value: string) => void
  content: string
  setContent: (value: string) => void
  category: string
  setCategory: (value: string) => void
  enviar: (e: React.FormEvent) => void
}