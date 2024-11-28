import { NextResponse } from "next/server";
import CommentDAO from "@/DAO/CommentDAO";

export async function POST(req) {
    try {
        const { post, user, content } = await req.json();

        if (!post || !user || !content) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const result = await CommentDAO.createComment({ post, user, content });

        if (!result) {
            return NextResponse.json({ error: 'Error al crear el comentario' }, { status: 500 });
        }

        return NextResponse.json({ comment: result }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}

export async function GET(req) {
    try {
        const id = new URL(req.url).searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID no proporcionado' }, { status: 400 });
        }

        const result = await CommentDAO.getCommentsByPostID(id);

        if (!result) {
            return NextResponse.json({ error: 'Error al obtener los comentarios' }, { status: 500 });
        }

        return NextResponse.json({ comments: result }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const receptorId = new URL(req.url).searchParams.get('id');

        if (!receptorId) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        return NextResponse.json({ url: `la url es: ${receptorId}` }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}

export async function PUT(req) {
    const receptorId = new URL(req.url).searchParams.get('id');

    try {

        if (!receptorId) {
            return NextResponse.json({ error: 'Missing id' }, { status: 400 });
        }

        const result = await CommentDAO.updateCommentById(receptorId);

        if (!result) {
            return NextResponse.json({ error: 'Error al actualizar el comentario' }, { status: 500 });
        }

        return NextResponse.json({ comment: result }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Error en el servidor' }, { status: 500 });
    }
}