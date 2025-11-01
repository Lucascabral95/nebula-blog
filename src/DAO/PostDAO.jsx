// import mongo from "@/services/mongoDB";
// import Post from "@/models/Post"
// import User from "@/models/User";

// class PostDAO {
//     constructor() {
//         this.inizializeDB();
//     }

//     async inizializeDB() {
//         try {
//             await mongo();
//         } catch (error) {
//             console.error("Error al conectar a la base de datos:", error);
//             throw error;
//         }
//     }

//     async getPosts() {
//         try {
//             const posts = await Post.find().populate("author");
//             return posts.reverse();
//         } catch (error) {
//             console.error("Error al obtener los posts:", error);
//         }
//     }

//     async getPostsWithoutPopulate() {
//         try {
//             const posts = (await Post.find()).reverse();
//             return posts;
//         } catch (error) {
//             console.error("Error al obtener los posts:", error);
//         }
//     }

//     async createPost(post) {
//         try {
//             const result = await Post.create(post);

//             return result;
//         } catch (error) {
//             console.error("Error al crear el post:", error);
//         }
//     }

//     async getPostById(id) {
//         try {
//             const post = await Post.findOne({ _id: id }).populate("author");
//             return post;
//         } catch (error) {
//             console.error("Error al obtener el post:", error);
//         }
//     }

//     async getPostByIdWithDataAndWithoutPopulate(id) {
//         try {
//             const post = await Post.findOne({ _id: id });
//             return post;
//         } catch (error) {
//             console.error("Error al obtener el post:", error);
//         }
//     }

//     async getPostByIdWithoutPopulate(id) {
//         try {
//             const post = await Post.findOne({ _id: id });
//             const user = await User.findOne({ _id: post.author });

//             return { post, user };
//         } catch (error) {
//             console.error("Error al obtener el post:", error);
//         }
//     }
    
//     async getPostByUserIdWithoutPopulate(id) {
//         try {
//             const posts = await Post.find({ "author": id })
//             const user = await User.find({ "_id": { $in: posts.map(post => post.author) } });

//             return {posts, user};
//         } catch (error) {
//             console.error("Error al obtener el post:", error);
//         }
//     }

//     async getPostBySlug(slug) {
//         try {
//             const post = await Post.findOne({ slug });
//             return post;
//         } catch (error) {
//             console.error("Error al obtener el post:", error);
//         }
//     }

//     async deletePostBySlug(slug) {
//         try {
//             const result = await Post.deleteOne({ slug });
//             return result;
//         } catch (error) {
//             console.error("Error al eliminar el post:", error);
//         }
//     }

//     async deletePostById(id) {
//         try {
//             const result = await Post.deleteOne({ _id: id });
//             return result;
//         } catch (error) {
//             console.error("Error al eliminar el post:", error);
//         }
//     }

//     async updatePostById(id) {
//         try {
//             const result = await Post.updateOne({ _id: id }, { $inc: { likes: 1 } });
//             return result;
//         } catch (error) {
//             console.error("Error al actualizar el post:", error);
//         }
//     }
// }

// export default new PostDAO;
import mongo from "@/services/mongoDB";
import Post from "@/models/Post";
import User from "@/models/User";

class PostDAO {
  constructor() {
    this.dbInitialized = false;
    this.initializeDB();
  }

  async initializeDB() {
    try {
      if (this.dbInitialized) return;

      await mongo();
      this.dbInitialized = true;
    } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      throw error;
    }
  }

  async ensureConnection() {
    if (!this.dbInitialized) {
      await this.initializeDB();
    }
  }

  async getPosts() {
    try {
      await this.ensureConnection();
      const posts = await Post.find()
        .populate("author")
        .maxTimeMS(8000)
        .lean()
        .exec();

      return posts.reverse();
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      return [];
    }
  }

  async getPostsWithoutPopulate() {
    try {
      await this.ensureConnection();
      const posts = await Post.find()
        .maxTimeMS(8000)
        .lean()
        .exec();

      return posts.reverse();
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      return [];
    }
  }

  async createPost(post) {
    try {
      await this.ensureConnection();
      const result = await Post.create(post);
      return result;
    } catch (error) {
      console.error("Error al crear el post:", error);
      throw error;
    }
  }

  async getPostById(id) {
    try {
      await this.ensureConnection();
      const post = await Post.findOne({ _id: id })
        .populate("author")
        .maxTimeMS(8000)
        .lean()
        .exec();

      return post;
    } catch (error) {
      console.error("Error al obtener el post:", error);
      return null;
    }
  }

  async getPostByIdWithDataAndWithoutPopulate(id) {
    try {
      await this.ensureConnection();
      const post = await Post.findOne({ _id: id })
        .maxTimeMS(8000)
        .lean()
        .exec();

      return post;
    } catch (error) {
      console.error("Error al obtener el post:", error);
      return null;
    }
  }

  async getPostByIdWithoutPopulate(id) {
    try {
      await this.ensureConnection();
      const post = await Post.findOne({ _id: id })
        .maxTimeMS(8000)
        .lean()
        .exec();

      if (!post) return null;

      const user = await User.findOne({ _id: post.author })
        .maxTimeMS(8000)
        .lean()
        .exec();

      return { post, user };
    } catch (error) {
      console.error("Error al obtener el post:", error);
      return null;
    }
  }

  async getPostByUserIdWithoutPopulate(id) {
    try {
      await this.ensureConnection();
      const posts = await Post.find({ author: id })
        .maxTimeMS(8000)
        .lean()
        .exec();

      if (posts.length === 0) return { posts: [], user: null };

      const user = await User.findOne({ _id: id })
        .maxTimeMS(8000)
        .lean()
        .exec();

      return { posts, user };
    } catch (error) {
      console.error("Error al obtener los posts:", error);
      return { posts: [], user: null };
    }
  }

  async getPostBySlug(slug) {
    try {
      await this.ensureConnection();
      const post = await Post.findOne({ slug })
        .maxTimeMS(8000)
        .lean()
        .exec();

      return post;
    } catch (error) {
      console.error("Error al obtener el post:", error);
      return null;
    }
  }

  async deletePostBySlug(slug) {
    try {
      await this.ensureConnection();
      const result = await Post.deleteOne({ slug });
      return result;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  }

  async deletePostById(id) {
    try {
      await this.ensureConnection();
      const result = await Post.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  }

  async updatePostById(id) {
    try {
      await this.ensureConnection();
      const result = await Post.updateOne({ _id: id }, { $inc: { likes: 1 } });
      return result;
    } catch (error) {
      console.error("Error al actualizar el post:", error);
      throw error;
    }
  }
}

export default new PostDAO();
