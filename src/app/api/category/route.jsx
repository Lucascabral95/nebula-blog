import { NextResponse } from "next/server";
import CategoryDAO from "@/DAO/CategoryDAO";

export async function POST(req) {
      const { name, description } = await req.json();

      if(!name || !description) {
          return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
      }
 
      const busquedaNombreCategoria = await CategoryDAO.getCategoryByName(name);

      if(busquedaNombreCategoria) {
          return NextResponse.json({ error: "La categoria ya existe" }, { status: 401 });
      }

      const category = { name, description };
      const result = await CategoryDAO.createCategory(category);

      if (!result) {
          return NextResponse.json({ error: "No se pudo crear la categoria" }, { status: 500 });
      }

      return NextResponse.json({ result }, { status: 201 });
}

export async function GET() {
      const result = await CategoryDAO.getCategories();

      if (!result) {
          return NextResponse.json({ error: "No se encontraron categorias" }, { status: 404 });
      }

      return NextResponse.json({ categorias: result }, { status: 200 });
}
