import { NextResponse } from "next/server";
import DireccionDAO from "@/DAO/DireccionDAO";

export async function GET(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const direccion = await DireccionDAO.getDireccionById(id);

        if (!direccion) {
            return NextResponse.json({ error: "La dirección del usuario no existe" }, { status: 404 });
        }

        return NextResponse.json({ result: direccion }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function POST(req) {
    const { user, localidad, partido, provincia, pais } = await req.json();

    if (!user || !localidad || !partido || !provincia || !pais) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const existeDireccion = await DireccionDAO.getDireccionById(user);

        if (existeDireccion) {
            return NextResponse.json({ error: "El usuario ya tiene una dirección" }, { status: 409 });
        }

        const result = await DireccionDAO.createDireccion({
            user: user,
            localidad: localidad,
            partido: partido,
            provincia: provincia,
            pais: pais
        });

        return NextResponse.json({ result }, { status: 201 });
    } catch (error) {
        console.error("Error al crear la dirección:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function PUT(req) {
        const { user, localidad, partido, provincia, pais } = await req.json();

        if (!user || !localidad || !partido || !provincia || !pais) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        try {
            const result = await DireccionDAO.updateDireccionById(user, {
                localidad: localidad,
                partido: partido,
                provincia: provincia,
                pais: pais
            });

            if ((!result) || (result.modifiedCount === 0)) {
                return NextResponse.json({ error: "La dirección del usuario no existe" }, { status: 404 });
            }

            return NextResponse.json({ result }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
        }
}

export async function DELETE(req) {
    const id = new URL(req.url).searchParams.get('id');
    
    if(!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
         const result = await DireccionDAO.deleteDireccionById(id);

        if (!result) {
            return NextResponse.json({ error: "La dirección del usuario no existe" }, { status: 404 });
        }

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}