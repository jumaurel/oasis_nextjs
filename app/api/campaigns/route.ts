import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth-server";
import { createCampaignSchema } from "@/lib/validations/campaign";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        structure: true,
        _count: {
          select: { savedSurveys: true },
        },
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des campagnes" },
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
    const validatedData = createCampaignSchema.parse(body);

    const campaign = await prisma.campaign.create({
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

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 },
      );
    }

    console.error("Error creating campaign:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la campagne" },
      { status: 500 },
    );
  }
}
