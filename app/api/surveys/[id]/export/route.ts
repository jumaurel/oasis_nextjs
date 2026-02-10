import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";

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

    const survey = await prisma.survey.findUnique({
      where: { id },
      include: {
        structure: { select: { name: true } },
        savedSurveys: {
          orderBy: { datePassation: "asc" },
        },
      },
    });

    if (!survey) {
      return NextResponse.json(
        { error: "Enquête introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      surveyName: survey.name,
      structureName: survey.structure.name,
      responses: survey.savedSurveys.map((s) => ({
        datePassation: s.datePassation,
        age: s.age,
        genre: s.genre,
        region: s.region,
        specialite: s.specialite,
        typePratique: s.typePratique,
        reponses: s.reponses,
      })),
    });
  } catch (error) {
    console.error("Error exporting survey:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'export" },
      { status: 500 },
    );
  }
}
