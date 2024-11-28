import { NextResponse } from "next/server";
import PostDAO from "@/DAO/PostDAO";

export async function GET() {
    
    try {
        // const post = await PostDAO.getPosts();
        const post = await PostDAO.getPostsWithoutPopulate();

        if (!post) {
            return NextResponse.json({ error: "No se encontraron posts" }, { status: 404 });
        }

        return NextResponse.json({ posts: post }, { status: 200 });
    } catch (error) {
        console.error("Error al obtener los posts:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function POST(req) {
    const { title, slug, content, author, categories } = await req.json();

    if (!title || !slug || !content || !author || !categories) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const post = await PostDAO.createPost({ title, slug, content, author, categories });
        return NextResponse.json({ post }, { status: 201 });
    } catch (error) {
        console.error("Error al crear el post:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function PUT(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const result = await PostDAO.updatePostById(id);

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "No se encontró el post o no se realizó ninguna modificación" }, { status: 404 });
        }

        const cantidadDeLikes = await PostDAO.getPostById(id);

        return NextResponse.json({ message: "Like dado exitosamente", cantidadDeLikes: cantidadDeLikes.likes }, { status: 200 });

    } catch (error) {
        console.error("Error al actualizar el post:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
