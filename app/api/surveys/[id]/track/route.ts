import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { event } = body as { event: "view" | "start" };

    if (event !== "view" && event !== "start") {
      return NextResponse.json(
        { error: "Événement invalide" },
        { status: 400 },
      );
    }

    const field = event === "view" ? "viewCount" : "startedCount";

    await prisma.survey.update({
      where: { id },
      data: { [field]: { increment: 1 } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking survey event:", error);
    return NextResponse.json(
      { error: "Erreur lors du suivi" },
      { status: 500 },
    );
  }
}
