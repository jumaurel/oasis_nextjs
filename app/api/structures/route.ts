import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { createStructureSchema } from "@/lib/validations/structure";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const structures = await prisma.structure.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { campaigns: true, savedSurveys: true },
        },
      },
    });

    return NextResponse.json(structures);
  } catch (error) {
    console.error("Error fetching structures:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des structures" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const validatedData = createStructureSchema.parse(body);

    const structure = await prisma.structure.create({
      data: {
        name: validatedData.name,
        referentEmail: validatedData.referentEmail,
      },
    });

    return NextResponse.json(structure, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error creating structure:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la structure" },
      { status: 500 },
    );
  }
}
