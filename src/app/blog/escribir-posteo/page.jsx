'use client'
import { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react'

import MyEditor from '@/components/EditorTexto/EditorTexto'
import { useCreatePost } from '@/presentation/hooks/useCreatePost'
import './NuevoPosteo.scss'
import { PostHeader } from '@/presentation/components/Post/PostHeader'
import { PostFooter } from '@/presentation/components/Post/PostFooter'

const NuevoPosteo = () => {
  const { data: session } = useSession()
  const { formState, handleTitleChange, handleContentChange, handleCategoryChange, handleSubmit } = useCreatePost()

  return (
    <div className="posteo">
      <div className="contenedor-posteo">
        <PostHeader email={session?.user?.email} onPublish={handleSubmit} />

        <MyEditor
          titulo={formState.titulo}
          setTitulo={handleTitleChange}
          content={formState.content}
          setContent={handleContentChange}
          category={formState.category}
          setCategory={handleCategoryChange}
          enviar={handleSubmit}
          handleChange={handleContentChange}
        />

        <Toaster />
      </div>

      <PostFooter />
    </div>
  )
}

export default NuevoPosteo
