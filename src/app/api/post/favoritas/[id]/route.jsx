import { NextResponse } from "next/server";
import FavoritasDAO from "@/DAO/FavoritasDAO";

export async function GET(req, { params }) {
    try {
        const { id } = params;        

        if(!id) {
            return NextResponse.json({ error: "El id es obligatorio" }, { status: 400 });
        }

        const favorita = await FavoritasDAO.getFavoritasByUser(id);

        console.log(favorita);

        return NextResponse.json({ result: favorita, status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor", status: 500 }); 
    }
}