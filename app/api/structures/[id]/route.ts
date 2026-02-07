import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { updateStructureSchema } from "@/lib/validations/structure";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const structure = await prisma.structure.findUnique({
      where: { id },
      include: {
        surveys: {
          include: {
            _count: {
              select: { savedSurveys: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!structure) {
      return NextResponse.json(
        { error: "Structure non trouvée" },
        { status: 404 },
      );
    }

    return NextResponse.json(structure);
  } catch (error) {
    console.error("Error fetching structure:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la structure" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateStructureSchema.parse(body);

    const structure = await prisma.structure.update({
      where: { id },
      data: {
        name: validatedData.name,
        referentEmail: validatedData.referentEmail,
      },
    });

    return NextResponse.json(structure);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error updating structure:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la structure" },
      { status: 500 },
    );
  }
}
