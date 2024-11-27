import { NextResponse } from "next/server";
import BioDAO from "@/DAO/BioDAO";

export async function GET(req, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const bioUsuario = await BioDAO.getBioFromPostAuthor(id);

        if (!bioUsuario) {
            return NextResponse.json({ result: null }, { status: 404 });  
        }

        return NextResponse.json({ result: bioUsuario, status: 200 });

    } catch (error) {
        console.error("Error en el servidor:", error); 
        return NextResponse.json({ error: "Error en el servidor", status: 500 });
    }
}
