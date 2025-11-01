import axios from 'axios'

import { ItemComment } from '../interfaces'

export const commentService = {
  getComments: async (postId: string): Promise<ItemComment[]> => {
    const { data } = await axios.get(`/api/comment?id=${postId}`)
    return data.comments
  },

  createComment: async (postId: string, userId: string, content: string): Promise<ItemComment> => {
    const { data } = await axios.post('/api/comment', {
      post: postId,
      user: userId,
      content,
    })
    return data.comment
  },

  likeComment: async (commentId: string): Promise<void> => {
    await axios.put(`/api/comment?id=${commentId}`)
  },
}
