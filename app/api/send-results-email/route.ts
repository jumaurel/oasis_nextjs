import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { buildResultsEmailHtml } from "./email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResultsEmailBody {
  email: string;
  fullname?: string;
  stetauscopeData: { subject: string; Score: number }[];
  aireData: { subject: string; Score: number }[];
  recomSport: boolean;
  isAddiction: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SendResultsEmailBody;

    if (!body.email || !body.email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 },
      );
    }

    const html = buildResultsEmailHtml({
      stetauscopeData: body.stetauscopeData,
      aireData: body.aireData,
      recomSport: body.recomSport,
      isAddiction: body.isAddiction,
      fullname: body.fullname,
    });

    const currentDate = new Date();
    const dateStr = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()}`;

    const { error } = await resend.emails.send({
      from: "OASIS - MOTS <questionnaire@mots-oasis.fr>",
      to: body.email,
      subject: `Vos résultats OASIS du ${dateStr}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi de l'email" },
      { status: 500 },
    );
  }
}
