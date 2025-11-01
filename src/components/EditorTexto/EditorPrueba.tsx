'use client'

import { Toaster } from 'react-hot-toast'
import { useEditorForm } from '@/presentation/hooks/useEditorForm'

const EditorPrueba = () => {
  const { titulo, setTitulo, content, setContent, handleSubmit } = useEditorForm()

  return (
    <div className="editor">
      <h1>Editor de texto</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={titulo}
          required
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label htmlFor="content">Contenido</label>
        <textarea
          rows={10}
          required
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Publicar</button>
      </form>

      <Toaster />
    </div>
  )
}

export default EditorPrueba
