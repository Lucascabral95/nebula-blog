import { NextResponse } from "next/server";
import FavoritasDAO from "@/DAO/FavoritasDAO";

export async function GET(req) {
    const id = new URL(req.url).searchParams.get('id');


    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
    }

    try {
        const sinFavoritas = await FavoritasDAO.getFavoritasByUser(id)

        if (!sinFavoritas) {
            return NextResponse.json({ result: [] }, { status: 200 })
        }

        return NextResponse.json({ result: sinFavoritas }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 })
    }
}

export async function POST(req) {
    const { user, post } = await req.json();

    if (!user || !post) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const usuarioExistente = await FavoritasDAO.getFavoritasByUser(user);

        if (!usuarioExistente) {
            const favorita = await FavoritasDAO.createFavorita({ user, post });
            return NextResponse.json({ result: favorita }, { status: 201 });
        }

        const favoritaExistente = usuarioExistente.post.find(favorita => favorita._id.toString() === post);

        if (favoritaExistente) {
            return NextResponse.json({ error: "La publicación ya se encuentra en [favorito]s" }, { status: 400 });
        }

        const favorita = await FavoritasDAO.addPostToFavoritas(user, post);
        return NextResponse.json({ result: favorita }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = new URL(req.url).searchParams.get('id');
    const post = new URL(req.url).searchParams.get('post');

    if (!id || !post) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const existeFavoritas = await FavoritasDAO.getFavoritasByUser(id);
        const favoritaExistente = existeFavoritas.post.some(favorita => favorita._id.toString() === post);

        if (!favoritaExistente) {
            return NextResponse.json({ error: "No se encontró la favorita" }, { status: 404 });
        }

        await FavoritasDAO.deletePostFromFavoritaByUserAndPostId(id, post);
        return NextResponse.json({ result: "Favorita eliminada con éxito" }, { status: 200 });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}