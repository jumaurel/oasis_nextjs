// ── PDF template for OASIS results using PDFKit ────────────────────────────
import PDFDocument from "pdfkit";
import { LOGO_OASIS_BASE64, AIRE_EXAMPLES_BASE64 } from "./images";

export interface PdfData {
  stetauscopeData: { subject: string; Score: number }[];
  aireData: { subject: string; Score: number }[];
  recomSport: boolean;
  isAddiction: boolean;
  fullname?: string;
  stetauscopeGraph?: string; // base64 data URI
  aireGraph?: string; // base64 data URI
}

function getDotColorLabel(
  value: number,
  subject: string,
  isAddiction: boolean,
): string {
  if (subject === "Santé perçue" && isAddiction) return "Risque élevé";
  if (value <= 15) return "Très favorable";
  if (value <= 30) return "Favorable";
  if (value <= 45) return "Modéré";
  if (value <= 65) return "Défavorable";
  return "Risque élevé";
}

/** Convert a data URI (data:image/...;base64,...) to a Buffer */
function dataUriToBuffer(dataUri: string): Buffer {
  const base64 = dataUri.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64, "base64");
}

// ── Helpers ──────────────────────────────────────────────────────────────────

const PAGE_MARGIN = 50;
const BODY_FONT_SIZE = 10;
const TITLE_FONT_SIZE = 14;
const HEADER_FONT_SIZE = 18;
const TABLE_FONT_SIZE = 8;
const USABLE_WIDTH = 595.28 - PAGE_MARGIN * 2; // A4 width minus margins

function addBody(doc: InstanceType<typeof PDFDocument>, text: string) {
  doc.font("Helvetica").fontSize(BODY_FONT_SIZE).text(text, {
    align: "justify",
    lineGap: 2,
  });
  doc.moveDown(0.5);
}

function addBoldBody(doc: InstanceType<typeof PDFDocument>, text: string) {
  doc.font("Helvetica-Bold").fontSize(BODY_FONT_SIZE).text(text, {
    align: "justify",
    lineGap: 2,
  });
}

function addTitle(doc: InstanceType<typeof PDFDocument>, text: string) {
  doc
    .font("Helvetica-Bold")
    .fontSize(TITLE_FONT_SIZE)
    .text(text, { align: "left" });
  doc.moveDown(0.5);
}

function addHeader(doc: InstanceType<typeof PDFDocument>, text: string) {
  doc
    .font("Helvetica-Bold")
    .fontSize(HEADER_FONT_SIZE)
    .text(text, { align: "center" });
  doc.moveDown(1.5);
}

function drawSimpleTable(
  doc: InstanceType<typeof PDFDocument>,
  headers: string[],
  rows: string[][],
  colWidths: number[],
) {
  const startX = PAGE_MARGIN;
  let y = doc.y;
  const rowHeight = 18;

  // Header row
  doc.font("Helvetica-Bold").fontSize(TABLE_FONT_SIZE);
  headers.forEach((h, i) => {
    const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
    doc.text(h, x, y, { width: colWidths[i], align: "left" });
  });

  y += rowHeight;
  doc
    .moveTo(startX, y)
    .lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y)
    .lineWidth(0.5)
    .stroke();
  y += 4;

  // Data rows
  doc.font("Helvetica").fontSize(TABLE_FONT_SIZE);
  for (const row of rows) {
    // Check page overflow
    if (y + rowHeight > doc.page.height - PAGE_MARGIN) {
      doc.addPage();
      y = PAGE_MARGIN;
    }
    row.forEach((cell, i) => {
      const x = startX + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
      doc.text(cell, x, y, { width: colWidths[i], align: "left" });
    });
    y += rowHeight;
    // Light line
    doc
      .moveTo(startX, y - 2)
      .lineTo(startX + colWidths.reduce((a, b) => a + b, 0), y - 2)
      .lineWidth(0.25)
      .strokeColor("#cccccc")
      .stroke();
    doc.strokeColor("#000000");
  }

  doc.y = y + 6;
}

// ── Main builder ─────────────────────────────────────────────────────────────

export function buildResultsPdf(
  data: PdfData,
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
  addHeader(doc, `Résultats de passation du ${dateStr}`);

  // ══════════════════════════════════════════════════════════
  // 1. STET'AUSCOPE
  // ══════════════════════════════════════════════════════════
  addTitle(doc, "1. Questionnaire Stet'auscope");

  addBoldBody(doc, "• Objectif :");
  addBody(
    doc,
    "Permettre d'identifier les facteurs de protection et les facteurs de risques de votre exercice professionnel, en termes d'épuisement, d'évènements indésirables, d'équilibre.",
  );
  doc.moveDown(0.3);
  addBoldBody(doc, "• Vos résultats :");
  doc.moveDown(0.5);

  // Stet'auscope graph
  if (data.stetauscopeGraph) {
    const graphBuffer = dataUriToBuffer(data.stetauscopeGraph);
    const imgX = PAGE_MARGIN + (USABLE_WIDTH - 360) / 2;
    doc.image(graphBuffer, imgX, doc.y, { width: 360, height: 290 });
    doc.y += 300;
  }

  addBoldBody(doc, "• Interprétation des résultats :");
  addBody(
    doc,
    "Plus le score par dimension est faible et donc proche de 0, au centre, plus il est favorable dans la dimension concernée. Inversement, lorsque ce score est élevé, il est symptomatique d'un déséquilibre médico-professionnel actuel et pourrait être à risque d'induire à court / moyen terme un effet en termes de santé globale.",
  );
  doc.moveDown(0.3);
  addBoldBody(doc, "• Intérêt :");
  addBody(
    doc,
    "L'intérêt de cette modélisation et de sa traduction graphique est double :\n  • vous permettre une visualisation très rapide et globale des résultats de l'évaluation que vous faites, à date : repérage des scores protecteurs et des scores défavorables pour chacune des dimensions,\n  • vous servir de guide pour essayer d'agir sur des facteurs de prévention complémentaire dans une ou plusieurs dimensions tout en conservant les facteurs de protection identifiés. Cette proposition n'est pas une solution en elle-même, mais elle peut vous aider à prendre conscience du poids que représentent pour vous personnellement et comme professionnel de santé, certaines dimensions qui agissent potentiellement comme facteurs de risque de déséquilibre voire d'épuisement professionnel.",
  );

  // ── Sport recommendation ───────────────────────────────
  if (data.recomSport) {
    doc.addPage();
    addBoldBody(doc, "• Recommandation :");
    doc.moveDown(0.3);
    addBoldBody(doc, "• Focus Activité physique et sédentarité :");
    addBody(
      doc,
      "Selon l'OMS, les adultes peuvent être considérés comme actifs en pratiquant de façon hebdomadaire :\n1. Au moins 150 à 300mn d'activité physique aérobique d'intensité modérée OU\n2. Au moins 75 à 150mn d'activité physique aérobique d'intensité soutenue OU\n3. Une combinaison équivalente tout au long de la semaine",
    );
    doc.moveDown(0.3);
    addBoldBody(doc, "Cela afin d'obtenir des bénéfices sur sa santé :");
    addBody(
      doc,
      "- baisse de la mortalité toutes causes confondues,\n- baisse de la mortalité liée aux maladies cardiovasculaires, de l'hypertension artérielle incidente,\n- diminution des risques de certains cancers incidents (côlon, sein),\n- diminution du diabète de type 2 incident,\n- amélioration de la santé mentale (symptômes d'anxiété et de dépression),\n- amélioration de la santé cognitive et du sommeil,\n- amélioration des mesures de l'adiposité.\nIl faut privilégier les activités avec sollicitations cardio-respiratoires. Associé à cela, il serait nécessaire d'ajouter des activités physiques de type renforcement musculaire et de garder des activités physiques quotidiennes (transports actifs, jardinage, bricolage…).",
    );
    doc.moveDown(0.3);
    addBoldBody(
      doc,
      "Être actif c'est bien mais pas que... Attention à la sédentarité !",
    );
    addBody(
      doc,
      "On peut être considéré comme physiquement actif car on a une activité physique régulière, mais avoir trop de comportements sédentaires. La sédentarité (ou comportement sédentaire) est définie comme une situation d'éveil caractérisée par une dépense énergétique inférieure ou égale à 1,5 MET. Elle correspond au temps passé assis ou allongé entre le lever et le coucher (HAS 2022).\nOr, « le risque de mortalité augmente de façon plus marquée lorsque l'on dépasse 7h par jour assis et il a été montré une augmentation de 85% de risques supplémentaires de mortalité cardiovasculaire, pour 7h ou plus passées devant un écran par jour » (ONAPS).\nQuel que soit le contexte (travail, transport, domestique, loisirs), il est nécessaire de réduire le temps total quotidien passé en position assise en interrompant les périodes prolongées (+ d'1h) selon les lignes directrices de l'OMS sur l'activité physique et la sédentarité.\nPar exemple : se lever toutes les 90 à 120 min, activité physique de type marche de quelques minutes et/ou des mouvements de mobilisation musculaire ou étirements, debout ou assis.",
    );
  }

  // ══════════════════════════════════════════════════════════
  // 2. AIRE
  // ══════════════════════════════════════════════════════════
  doc.addPage();
  addTitle(doc, "2. Questionnaire AIRE");

  addBoldBody(doc, "• Objectifs :");
  addBody(
    doc,
    "Nous postulons que le rapport que nous entretenons à une activité peut s'évaluer à travers la perception que nous avons de 4 dimensions :\n1. Les Attentes : c'est ce que nous ressentons que l'on attend de nous ;\n2. L'Investissement : c'est la part affective, ce que nous avons envie de donner ; la motivation que nous ressentons spontanément ;\n3. Les Renforcements ou Récompenses : ce que nous recevons de notre travail, ce qu'il nous rapporte ; à la fois en terme matériel (argent, confort) et en termes plus personnels (intérêt, plaisir, satisfaction);\n4. L'Efficacité : le sentiment d'arriver à effectuer correctement, voire avec une certaine performance les tâches que l'on attend de nous dans notre travail.",
  );
  addBody(
    doc,
    "L'ensemble forme l'acronyme AIRE, d'où le nom du modèle. L'idée de base est qu'un rapport satisfaisant au travail se traduit par un équilibre entre les 4 dimensions, et avec une intensité moyenne sur chacune de ces dimensions.",
  );
  addBody(
    doc,
    "Une situation de souffrance au travail se traduit par un déséquilibre et/ou une intensité trop forte ou trop faible entre ces 4 dimensions. La modélisation sur 4 axes aide à percevoir aisément les deux aspects : un rapport équilibré au travail se traduit par un carré globalement régulier et de superficie moyenne.",
  );
  doc.moveDown(0.3);
  addBoldBody(doc, "• Vos résultats :");
  doc.moveDown(0.5);

  // AIRE graph
  if (data.aireGraph) {
    const graphBuffer = dataUriToBuffer(data.aireGraph);
    const imgX = PAGE_MARGIN + (USABLE_WIDTH - 280) / 2;
    doc.image(graphBuffer, imgX, doc.y, { width: 280, height: 200 });
    doc.y += 210;
  }

  addBoldBody(doc, "• Interprétation des résultats :");
  addBody(
    doc,
    "- Un rapport équilibré au travail se traduit par un carré globalement régulier et de superficie moyenne\n- Un surinvestissement peut se traduire par une figure régulière mais de superficie beaucoup plus étendue, à l'inverse un sous-investissement se traduira par une figure globalement régulière mais très petite.\n- Le burnout peut se manifester par une figure de forme très irrégulière, avec des Attentes très élevées, des Renforcements faibles, et un Investissement et un sentiment d'Efficacité plus ou moins conservé.",
  );

  // AIRE examples image
  const examplesBuffer = dataUriToBuffer(AIRE_EXAMPLES_BASE64);
  if (doc.y + 300 > doc.page.height - PAGE_MARGIN) {
    doc.addPage();
  }
  doc.image(examplesBuffer, PAGE_MARGIN, doc.y, { width: USABLE_WIDTH });
  doc.y += 260;

  // ── AIRE Intérêts ──────────────────────────────────────
  doc.addPage();
  addBoldBody(doc, "• Intérêts :");
  addBody(
    doc,
    "L'intérêt de cette modélisation et de sa traduction graphique est double :",
  );
  addBody(
    doc,
    "1. D'une part, elle aide très rapidement à repérer les déséquilibres dans les différentes dimensions ;",
  );
  addBody(
    doc,
    "2. D'autre part, elle peut être un guide pour essayer corriger la sur ou la sous-évaluation que nous pouvons avoir d'une dimension :\n    - Ce que je perçois que l'on attend de moi est-il impératif ? N'ai-je pas tendance à me créer des obligations ? N'ai-je pas la possibilité et le droit de différer mes réponses ?\n    - Ne me suis-je pas progressivement trop investi dans (ou désinvesti de) mon travail ?\n    - Ai-je pris en compte tous les Renforcements que je reçois de mon travail ? est-ce que je ne suis pas sur-sensibilisé aux côtés désagréables ?\n    - Ou à l'inverse, n'ai-je pas tendance à me rendre prisonnier d'avantages, de gratifications (bon revenu, considération, remerciements, reconnaissance) qui m'obligent à garder une activité soutenue ? ne pourrais-je pas me passer d'une partie, en me désinvestissant un peu ?\n    - Si je me sens en perte d'efficacité, est-ce bien la réalité ? Est-ce que les témoignages que je reçois vont dans ce sens ou pas ?",
  );
  addBody(
    doc,
    "Ce modèle AIRE ne prétend pas tout régler, loin s'en faut, mais il est là pour nous aider à modéliser la vision que nous avons et le rapport que nous entretenons avec telle ou telle activité (clinique, associative, administrative, familiale...) ; puis réfléchir dessus et si possible, les faire évoluer pour un mieux être, une plus grande liberté, un meilleur équilibre de vie.",
  );

  // ══════════════════════════════════════════════════════════
  // 3. CONCLUSION
  // ══════════════════════════════════════════════════════════
  doc.addPage();
  addTitle(doc, "3. Conclusion");

  addBody(
    doc,
    "Au-delà de ces outils réflexifs, notre priorité est de pouvoir vous accompagner si vous le jugez utile. Nous accompagnons dans la plus stricte confidentialité et indépendance, médecins et professionnels de santé avec Ordre et/ou URPS. Depuis 2010, c'est plus de 2400 praticiens qui ont bénéficié de notre modèle de pair-aidance.",
  );
  addBody(
    doc,
    "Vous pouvez retrouver plus d'informations sur le site internet de l'Association MOTS : www.association-mots.org. Pour toute demande d'accompagnement par un médecin-effecteur de l'association, ne pas utiliser l'adresse mail de contact du site mais appelez le : 06 08 282 589.",
  );
  doc
    .font("Helvetica-Bold")
    .fontSize(BODY_FONT_SIZE)
    .text("L'équipe médicale MOTS", { align: "right" });
  doc.moveDown(1);

  // ══════════════════════════════════════════════════════════
  // 4. ANNEXE
  // ══════════════════════════════════════════════════════════
  addTitle(doc, "4. Annexe : Résumé des questions et réponses données");

  addBoldBody(doc, "Questionnaire Stet'auscope");
  doc.moveDown(0.3);

  const stetauscopeRows = data.stetauscopeData.map((item) => [
    item.subject,
    String(item.Score),
    getDotColorLabel(item.Score, item.subject, data.isAddiction),
  ]);
  drawSimpleTable(doc, ["Domaine", "Score", "Niveau"], stetauscopeRows, [
    USABLE_WIDTH * 0.4,
    USABLE_WIDTH * 0.2,
    USABLE_WIDTH * 0.4,
  ]);

  doc.moveDown(0.5);
  addBoldBody(doc, "Questionnaire AIRE");
  doc.moveDown(0.3);

  const aireRows = data.aireData.map((item) => [
    item.subject,
    String(item.Score),
    "9",
  ]);
  drawSimpleTable(doc, ["Dimension", "Score", "Max"], aireRows, [
    USABLE_WIDTH * 0.5,
    USABLE_WIDTH * 0.25,
    USABLE_WIDTH * 0.25,
  ]);

  return doc;
}
