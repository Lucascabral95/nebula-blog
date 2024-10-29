import { NextResponse } from "next/server";
import DetallesDAO from "@/DAO/DetallesDAO";

export async function GET(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const existeDetalles = await DetallesDAO.getDetallesById(id);

        if (!existeDetalles) {
            return NextResponse.json({ error: "El usuario no tiene detalles" }, { status: 404 });
        }

        return NextResponse.json({ result: existeDetalles }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function POST(req) {
    const { user, email, celular, fechaNacimiento, genero, linkeding, github } = await req.json();

    if (!user || !email || !celular || !fechaNacimiento || !genero) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const existeDetalles = await DetallesDAO.getDetallesById(user);

        if (existeDetalles) {
            return NextResponse.json({ error: "El usuario ya tiene detalles" }, { status: 409 });
        }

        const result = await DetallesDAO.createDetalles({
            user: user,
            email: email,
            celular: celular,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            linkeding: linkeding,
            github: github
        });

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function PUT(req) {
    const { user, email, celular, fechaNacimiento, genero, linkeding, github } = await req.json();

    if (!user || !email || !celular || !fechaNacimiento || !genero) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {

        const result = await DetallesDAO.updateDetallesById(user, {
            email: email,
            celular: celular,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            linkeding: linkeding,
            github: github
        });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ error: "No se encontró el usuario o no se realizó ninguna modificación" }, { status: 404 });
        }

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function DELETE(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const result = await DetallesDAO.deleteDetallesById(id);

        if (!result) {
            return NextResponse.json({ error: "El usuario no tiene detalles" }, { status: 404 });
        }

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}