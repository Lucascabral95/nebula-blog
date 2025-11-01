'use client'
import { useRef } from 'react'
import { Toaster } from 'react-hot-toast'

import { MyEditorProps } from '@/infrastructure/interfaces'
import './EditorTexto.scss'

const MyEditor = ({
  titulo,
  setTitulo,
  content,
  setContent,
  category,
  setCategory,
  enviar,
}: MyEditorProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const formatContent = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ))
  }

  return (
    <div className="editor">
      <div className="contenedor-input-blog">
        <input
          type="text"
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="contenedor-input-blog-categoria">
        <input
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="editor-de-codigo">
        <div className="contenedor-del-text-area">
          <div className="input-text-area">
            <textarea
              ref={textareaRef}
              onInput={handleInput}
              name="content"
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribi tu noticia acá"
            />
          </div>
          <div className="boton-de-publicacion">
            <button className="boton-boton-de-publicacion" onClick={enviar}>
              Publicar
            </button>
          </div>
        </div>

        <h2>Vista previa:</h2>
        <p style={{ wordBreak: 'break-word', marginTop: '10px' }}>
          {formatContent(content)}
        </p>
      </div>

      <Toaster />
    </div>
  )
}

export default MyEditor
