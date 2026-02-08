// ── PDF template for OASIS attestation using PDFKit ────────────────────────
import PDFDocument from "pdfkit";
import { LOGO_OASIS_BASE64 } from "./images";

export interface AttestationData {
  fullname: string;
}

/** Convert a data URI (data:image/...;base64,...) to a Buffer */
function dataUriToBuffer(dataUri: string): Buffer {
  const base64 = dataUri.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64, "base64");
}

const PAGE_MARGIN = 50;

export function buildAttestationPdf(
  data: AttestationData,
): InstanceType<typeof PDFDocument> {
  const doc = new PDFDocument({
    size: "A4",
    margins: {
      top: PAGE_MARGIN,
      bottom: PAGE_MARGIN,
      left: PAGE_MARGIN,
      right: PAGE_MARGIN,
    },
    bufferPages: true,
    autoFirstPage: true,
  });

  const currentDate = new Date();
  const dateStr = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()}`;

  // ── Logo ────────────────────────────────────────────────
  const logoBuffer = dataUriToBuffer(LOGO_OASIS_BASE64);
  doc.image(logoBuffer, PAGE_MARGIN, PAGE_MARGIN, { width: 150 });
  doc.moveDown(4);

  // ── Header ──────────────────────────────────────────────
  doc
    .font("Helvetica-Bold")
    .fontSize(18)
    .text("Attestation de passation", { align: "center" });
  doc.moveDown(3);

  // ── Body ────────────────────────────────────────────────
  doc
    .font("Helvetica")
    .fontSize(12)
    .text(
      `L'association MOTS atteste que ${data.fullname} a complété le ${dateStr} l'intégralité des 2 questionnaires réflexifs (Stet-Auscope et AIRE), contenus dans l'application OASIS.`,
      { align: "justify", lineGap: 3 },
    );
  doc.moveDown(0.8);
  doc.text(
    "Lui ont été remis individuellement les résultats de son auto-évaluation personnelle et confidentielle, par dimensions, avec une aide à l'interprétation.",
    { align: "justify", lineGap: 3 },
  );
  doc.moveDown(0.8);
  doc.text(
    "Cette attestation est délivrée exclusivement à la demande de l'intéressé/e à l'adresse mail personnelle qu'il / elle a renseignée.",
    { align: "justify", lineGap: 3 },
  );

  // ── Signature ───────────────────────────────────────────
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(12)
    .text(`Date de délivrance de l'attestation : ${dateStr}`, {
      align: "left",
    });
  doc.moveDown(1);
  doc.text(
    "Dr E. Granier, Conseiller Technique Psychiatre et Dr L. Solvignon, Médecin Référent Technique\nAssociation MOTS\nhttps://www.mots-association.org",
    { align: "left" },
  );

  // ── Horizontal line ─────────────────────────────────────
  doc.moveDown(2.5);
  const lineY = doc.y;
  doc
    .moveTo(PAGE_MARGIN, lineY)
    .lineTo(595.28 - PAGE_MARGIN, lineY)
    .lineWidth(1)
    .stroke();
  doc.moveDown(0.8);

  // ── Footer ──────────────────────────────────────────────
  doc
    .font("Helvetica-Oblique")
    .fontSize(9)
    .text(
      "OASIS est l'Outil d'Autoévaluation pour la Santé Individuelle du Soignant, conçu et développé par MOTS.\n\nL'Association MOTS est une association d'entraide Confraternelle créée en 2010 qui accompagne des médecins et des professionnels de santé (avec Ordre professionnel et/ ou URPS) dans le champ de la prévention de l'épuisement professionnel et plus largement de la promotion de la santé globale du soignant.\nLes accompagnements individuels dont bénéficient les professionnels de santé qui font appel à notre association d'entraide sont confidentiels, réalisés dans un modèle de pair - aidance par des médecins - effecteurs MOTS spécifiquement formés.\n\nMOTS a conçu et développé OASIS, un outil numérique réflexif pour aider le professionnel de santé à auto - évaluer les facteurs de protection et les facteurs de risque organisationnels et individuels pouvant avoir des effets sur sa santé, son exercice professionnel et son équilibre personnel.\n\nAucun résultat individuel ne peut être transmis par MOTS à quiconque, seuls des résultats collectifs garantissant un total anonymat peuvent être partagés pour faire l'objet d'un traitement et / ou d'une présentation statistique.",
      { align: "justify", lineGap: 2 },
    );

  return doc;
}
