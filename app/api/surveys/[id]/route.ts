import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { updateSurveySchema } from "@/lib/validations/survey";

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

    await prisma.survey.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting survey:", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'enquête" },
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
    const validatedData = updateSurveySchema.parse(body);

    const survey = await prisma.survey.update({
      where: { id },
      data: {
        name: validatedData.name,
        surveyType: validatedData.surveyType,
        startDate: new Date(validatedData.startDate),
        expirationDate: new Date(validatedData.expirationDate),
        maxResponses: validatedData.maxResponses ?? null,
        ...(validatedData.status ? { status: validatedData.status } : {}),
      },
    });

    return NextResponse.json(survey);
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error updating survey:", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'enquête" },
      { status: 500 },
    );
  }
}
