import { NextResponse } from "next/server";
import DireccionDAO from "@/DAO/DireccionDAO";

export async function GET(req, { params }) {
try {
    const { id } = params;

    const rcesult = await DireccionDAO.getDireccionById(id);

    return NextResponse.json({ result: rcesult }, { status: 200 });
} catch (error) {
     return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
}
}