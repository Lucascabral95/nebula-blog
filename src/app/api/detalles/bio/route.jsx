import { NextResponse } from "next/server";
import BioDAO from "@/DAO/BioDAO";

export async function GET(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const bioUsuario = await BioDAO.getBioById(id);

        if (!bioUsuario) {
            return NextResponse.json({ result: null }, { status: 201 });
        }

        return NextResponse.json({ result: bioUsuario }, { status: 200 });
    } catch (error) {
        console.error("Error al obtener el bio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function POST(req) {
    const { user, nombreCompleto, bio, edad, pronombres } = await req.json();

    if (!user || !nombreCompleto || !bio || !edad || !pronombres) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const bioExistente = await BioDAO.getBioById(user);
        if (bioExistente) {
            return NextResponse.json({ error: "El usuario ya tiene un bio" }, { status: 409 });
        }

        const result = await BioDAO.createBio({ user, nombreCompleto, bio, edad, pronombres });
        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error("Error al crear el bio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function PUT(req) {
    const { user, nombreCompleto, bio, edad, pronombres } = await req.json();

    if (!user || !nombreCompleto || !bio || !edad || !pronombres) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const result = await BioDAO.updateBioById(user, {
            nombreCompleto: nombreCompleto,
            bio: bio,
            edad: edad,
            pronombres: pronombres
        })

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error("Error al actualizar el bio:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const result = await BioDAO.deleteBioById(id);

        if (!result) {
            return NextResponse.json({ error: "El usuario no tiene bio" }, { status: 404 });
        }

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}