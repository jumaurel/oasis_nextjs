import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import PDFDocument from "pdfkit";
import { buildResultsEmailHtml } from "./email-template";
import { buildResultsPdf } from "./pdf-template";
import { buildAttestationPdf } from "./attestation-template";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendResultsEmailBody {
  email: string;
  fullname?: string;
  stetauscopeData: { subject: string; Score: number }[];
  aireData: { subject: string; Score: number }[];
  recomSport: boolean;
  isAddiction: boolean;
  stetauscopeGraph?: string; // base64 data URI
  aireGraph?: string; // base64 data URI
  plainData?: {
    name: string;
    title: string;
    displayValue: string;
    isNode?: boolean;
  }[];
}

/** Collect a PDFKit document stream into a base64 string */
function pdfToBase64(doc: InstanceType<typeof PDFDocument>): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => {
      resolve(Buffer.concat(chunks).toString("base64"));
    });
    doc.on("error", reject);
    doc.end();
  });
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

    const hasAttestation = !!body.fullname && body.fullname.trim().length > 0;

    const html = buildResultsEmailHtml({
      fullname: body.fullname,
      hasAttestation,
    });

    const currentDate = new Date();
    const dateStr = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()}`;

    // ── Generate Results PDF ──────────────────────────────
    const resultsDoc = buildResultsPdf({
      stetauscopeData: body.stetauscopeData,
      aireData: body.aireData,
      recomSport: body.recomSport,
      isAddiction: body.isAddiction,
      fullname: body.fullname,
      stetauscopeGraph: body.stetauscopeGraph,
      aireGraph: body.aireGraph,
      plainData: body.plainData,
    });
    const resultsPdfBase64 = await pdfToBase64(resultsDoc);

    // Build attachments array
    const attachments = [
      {
        filename: `Resultats_OASIS_${dateStr.replace(/\//g, "-")}.pdf`,
        content: resultsPdfBase64,
      },
    ];

    // ── Generate Attestation PDF (if fullname provided) ───
    if (hasAttestation) {
      const attestationDoc = buildAttestationPdf({
        fullname: body.fullname!,
      });
      const attestationPdfBase64 = await pdfToBase64(attestationDoc);

      attachments.push({
        filename: `Attestation_OASIS_${dateStr.replace(/\//g, "-")}.pdf`,
        content: attestationPdfBase64,
      });
    }

    // ── Send email via Resend ─────────────────────────────
    const { error } = await resend.emails.send({
      from: "OASIS - MOTS <questionnaire@mots-oasis.fr>",
      to: body.email,
      subject: `Vos résultats OASIS du ${dateStr}`,
      html,
      attachments,
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
