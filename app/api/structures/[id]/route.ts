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
          select: {
            id: true,
            name: true,
            startDate: true,
            expirationDate: true,
            maxResponses: true,
            status: true,
            surveyType: true,
            viewCount: true,
            startedCount: true,
            createdAt: true,
            updatedAt: true,
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

export async function DELETE(
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
      include: { _count: { select: { surveys: true } } },
    });

    if (!structure) {
      return NextResponse.json(
        { error: "Structure non trouvée" },
        { status: 404 },
      );
    }

    if (structure._count.surveys > 0) {
      return NextResponse.json(
        {
          error:
            "Impossible de supprimer une structure qui contient des enquêtes. Veuillez d'abord supprimer toutes les enquêtes.",
        },
        { status: 400 },
      );
    }

    await prisma.structure.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting structure:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la structure" },
      { status: 500 },
    );
  }
}
