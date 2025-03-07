import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function obtenerDocumentoPDF() {
  const documento_pdf = await prisma.documentos_pdf.findMany({
    take: 1,
    select: {
      id: true,
      presidente: true,
      sexo_presidente: true,
      atencion_ciudadana: true,
      sexo_atencion_ciudadana: true,
      hay_jefe: true,
      img: true,
    },
  });

  const data = documento_pdf.length > 0 ? {
    ...documento_pdf[0],
    img: documento_pdf[0].img || "/images/Image-not-found.png"
  } : {
    id: 0,
    presidente: "",
    sexo_presidente: "",
    atencion_ciudadana: "",
    sexo_atencion_ciudadana: "",
    hay_jefe: false,
    img: "/images/Image-not-found.png"
  };

  return data;
}

export async function GET() {
  try {
    const documento_pdf = await prisma.documentos_pdf.findMany({
      take: 1,
      select: {
        id: true,
        presidente: true,
        sexo_presidente: true,
        atencion_ciudadana: true,
        sexo_atencion_ciudadana: true,
        hay_jefe: true,
        img: true,
      },
    });

    const data =
      documento_pdf.length > 0
        ? {
            ...documento_pdf[0],
            img: documento_pdf[0].img || "/images/Image-not-found.png",
          }
        : {
            id: 0,
            presidente: "",
            sexo_presidente: "",
            atencion_ciudadana: "",
            sexo_atencion_ciudadana: "",
            hay_jefe: false,
            img: "/images/Image-not-found.png",
          };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener datos" },
      { status: 500 }
    );
  }
}

