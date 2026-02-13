import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { createSurveySchema } from "@/lib/validations/survey";
import { buildSurveyCreatedEmailHtml } from "@/app/api/send-survey-email/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const surveys = await prisma.survey.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        structure: true,
        _count: {
          select: { savedSurveys: true },
        },
      },
    });

    return NextResponse.json(surveys);
  } catch (error) {
    console.error("Error fetching surveys:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des enquêtes" },
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
    const validatedData = createSurveySchema.parse(body);

    const survey = await prisma.survey.create({
      data: {
        name: validatedData.name,
        structureId: validatedData.structureId,
        startDate: new Date(validatedData.startDate),
        expirationDate: new Date(validatedData.expirationDate),
        maxResponses: validatedData.maxResponses ?? null,
        surveyType: validatedData.surveyType,
      },
      include: {
        structure: true,
      },
    });

    // Send email to structure referent
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        request.headers.get("origin") ||
        "https://mots-oasis.fr";
      const surveyLink = `${baseUrl}/${survey.id}`;

      const html = buildSurveyCreatedEmailHtml({
        structureName: survey.structure.name,
        surveyName: survey.name,
        surveyType: survey.surveyType,
        startDate: validatedData.startDate,
        expirationDate: validatedData.expirationDate,
        maxResponses: survey.maxResponses,
        surveyLink,
      });

      await resend.emails.send({
        from: "OASIS - MOTS <questionnaire@mots-oasis.fr>",
        to: survey.structure.referentEmail,
        subject: `Nouvelle enquête créée : ${survey.name}`,
        html,
      });
    } catch (emailError) {
      // Log but don't fail the survey creation if email fails
      console.error("Error sending survey creation email:", emailError);
    }

    return NextResponse.json(survey, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error creating survey:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de l'enquête" },
      { status: 500 },
    );
  }
}
