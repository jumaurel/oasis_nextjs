import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { responseSchema } from "@/lib/validations/demographics";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const validatedData = responseSchema.parse(body);

    // Vérifier que l'enquête existe et est EN_COURS
    const survey = await prisma.survey.findUnique({
      where: { id },
    });

    if (!survey) {
      return NextResponse.json(
        { error: "Enquête introuvable" },
        { status: 404 },
      );
    }

    if (survey.status !== "EN_COURS") {
      return NextResponse.json(
        { error: "Cette enquête n'est plus active" },
        { status: 400 },
      );
    }

    const now = new Date();
    if (survey.expirationDate < now) {
      return NextResponse.json(
        { error: "Cette enquête est expirée" },
        { status: 400 },
      );
    }

    if (survey.startDate > now) {
      return NextResponse.json(
        { error: "Cette enquête n'a pas encore commencé" },
        { status: 400 },
      );
    }

    // Vérifier le nombre maximum de réponses
    if (survey.maxResponses) {
      const responseCount = await prisma.savedSurvey.count({
        where: { surveyId: id },
      });
      if (responseCount >= survey.maxResponses) {
        return NextResponse.json(
          { error: "Le nombre maximum de réponses a été atteint" },
          { status: 400 },
        );
      }
    }

    const savedSurvey = await prisma.savedSurvey.create({
      data: {
        age: validatedData.age,
        genre: validatedData.genre,
        region: validatedData.region,
        specialite: validatedData.specialite,
        typePratique: validatedData.typePratique,
        reponses: validatedData.reponses as Prisma.InputJsonValue,
        surveyId: id,
        structureId: survey.structureId,
      },
    });

    return NextResponse.json({ id: savedSurvey.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error saving survey response:", error);
    return NextResponse.json(
      { error: "Erreur lors de la sauvegarde de la réponse" },
      { status: 500 },
    );
  }
}
