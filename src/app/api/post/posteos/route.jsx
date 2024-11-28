import { NextResponse } from "next/server";
import PostDAO from "@/DAO/PostDAO";

export async function GET() {
    try {
        const results = await PostDAO.getPosts();

        if (!results) {
            return NextResponse.json({ error: "No se encontraron posteos" }, { status: 404 });
        }

        return NextResponse.json({ posteos: results, status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}