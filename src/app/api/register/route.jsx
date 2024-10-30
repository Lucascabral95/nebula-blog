import { NextResponse } from "next/server";
import mongo from "@/services/mongoDB"; 
import UserDAO from "@/DAO/UserDAO";

export async function POST(req) {
    await mongo(); 
    const { name, email, password } = await req.json();

    try {
        if (!name || !email || !password) {
            return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
        }

        const verificacionUsuarioRepetido = await UserDAO.findUserByEmail(email);

        if (verificacionUsuarioRepetido) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
        }

        if (password.length < 6) {
            return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres" }, { status: 400 });
        }

        await UserDAO.createUser({ name, email, password });

        return NextResponse.json({ message: "Usuario creado correctamente" }, { status: 201 });

    } catch (error) {
        console.error("Error creando usuario:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}

export async function GET(req) {
    const id = new URL(req.url).searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    try {
        const user = await UserDAO.getUserById(id);

        if (!user) {
            return NextResponse.json({ error: "El usuario no existe" }, { status: 404 });
        }

        return NextResponse.json({ result: "Usuario encontrado" }, { status: 200 });

    } catch (error) {
        console.error("Error al buscar usuario:", error);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}