import { NextResponse } from "next/server";
import PostDAO from "@/DAO/PostDAO";

export async function GET(req, {params}) {
    try {
        const { id } = params

        if(!id) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const results = await PostDAO.getPostByUserIdWithoutPopulate(id);

        return NextResponse.json({ result: results }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}