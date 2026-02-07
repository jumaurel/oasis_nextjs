// ── HTML email template for OASIS results ────────────────────────────────────

interface EmailData {
  stetauscopeData: { subject: string; Score: number }[];
  aireData: { subject: string; Score: number }[];
  recomSport: boolean;
  isAddiction: boolean;
  fullname?: string;
}

function getDotColor(value: number, subject: string, isAddiction: boolean) {
  if (subject === "Santé perçue" && isAddiction) return "#e41a1c";
  if (value <= 15) return "#039625";
  if (value <= 30) return "#0edd3e";
  if (value <= 45) return "#d1db09";
  if (value <= 65) return "#db8711";
  return "#e41a1c";
}

function getColorLabel(value: number, subject: string, isAddiction: boolean) {
  if (subject === "Santé perçue" && isAddiction) return "Risque élevé";
  if (value <= 15) return "Très favorable";
  if (value <= 30) return "Favorable";
  if (value <= 45) return "Modéré";
  if (value <= 65) return "Défavorable";
  return "Risque élevé";
}

export function buildResultsEmailHtml(data: EmailData): string {
  const currentDate = new Date();
  const dateStr = `${String(currentDate.getDate()).padStart(2, "0")}/${String(currentDate.getMonth() + 1).padStart(2, "0")}/${currentDate.getFullYear()}`;

  const greeting = data.fullname
    ? `Bonjour ${data.fullname},`
    : "Bonjour,";

  // Build Stet'Auscope results table rows
  const stetauscopeRows = data.stetauscopeData
    .map((item) => {
      const color = getDotColor(item.Score, item.subject, data.isAddiction);
      const label = getColorLabel(item.Score, item.subject, data.isAddiction);
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151;">
            ${item.subject}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; text-align: center;">
            <div style="display: inline-block; background-color: ${color}; color: #fff; font-weight: 700; font-size: 14px; width: 42px; height: 42px; line-height: 42px; border-radius: 50%; text-align: center;">
              ${item.Score}
            </div>
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: ${color}; font-weight: 600;">
            ${label}
          </td>
        </tr>`;
    })
    .join("");

  // Build AIRE results table rows
  const aireRows = data.aireData
    .map((item) => {
      return `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151;">
            ${item.subject}
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; text-align: center;">
            <div style="display: inline-block; background-color: #0d196d; color: #fff; font-weight: 700; font-size: 14px; width: 42px; height: 42px; line-height: 42px; border-radius: 50%; text-align: center;">
              ${item.Score}
            </div>
          </td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
            / 9
          </td>
        </tr>`;
    })
    .join("");

  // Build sport recommendation block if applicable
  const sportRecommendation = data.recomSport
    ? `
    <div style="background-color: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <h3 style="margin: 0 0 12px; font-size: 16px; color: #92400e;">💡 Recommandation : Activité physique et sédentarité</h3>
      <p style="font-size: 13px; color: #78350f; line-height: 1.6; margin: 0 0 10px;">
        Selon l'OMS, les adultes peuvent être considérés comme actifs en pratiquant de façon hebdomadaire :
      </p>
      <ul style="font-size: 13px; color: #78350f; line-height: 1.6; padding-left: 20px; margin: 0 0 10px;">
        <li>Au moins 150 à 300 min d'activité physique aérobique d'intensité modérée, OU</li>
        <li>Au moins 75 à 150 min d'activité physique aérobique d'intensité soutenue, OU</li>
        <li>Une combinaison équivalente tout au long de la semaine</li>
      </ul>
      <p style="font-size: 13px; color: #78350f; line-height: 1.6; margin: 0 0 10px;">
        <strong>Bénéfices sur la santé :</strong> baisse de la mortalité toutes causes confondues, diminution des risques cardiovasculaires, de certains cancers (côlon, sein), du diabète de type 2, amélioration de la santé mentale, du sommeil et de la santé cognitive.
      </p>
      <p style="font-size: 13px; color: #78350f; line-height: 1.6; margin: 0;">
        <strong>Attention à la sédentarité !</strong> Le risque de mortalité augmente lorsque l'on dépasse 7h par jour assis. Il est recommandé de se lever toutes les 90 à 120 min et de pratiquer des mouvements de mobilisation.
      </p>
    </div>`
    : "";

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Résultats OASIS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header -->
    <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%); border-radius: 12px 12px 0 0; padding: 32px 24px; text-align: center;">
      <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
        OASIS
      </h1>
      <p style="margin: 6px 0 0; color: #bfdbfe; font-size: 13px;">
        Outil d'Autoévaluation pour la Santé Individuelle du Soignant
      </p>
    </div>

    <!-- Main Card -->
    <div style="background-color: #ffffff; border-radius: 0 0 12px 12px; padding: 32px 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 8px;">
        ${greeting}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 24px;">
        Vous trouverez ci-dessous le récapitulatif de vos résultats OASIS du <strong>${dateStr}</strong>.
      </p>

      <!-- ── Stet'Auscope ────────────────────────── -->
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; color: #1e3a5f; border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin: 0 0 6px;">
          1. Questionnaire Stet'Auscope
        </h2>
        <p style="font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0 0 16px;">
          Ce tableau présente les domaines en lien avec votre activité professionnelle. Un score faible (vert, proche de 0) signifie un meilleur facteur de protection. Un score élevé (rouge) représente un facteur de risque potentiel.
        </p>

        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #1e3a5f;">
              <th style="padding: 12px 14px; text-align: left; font-size: 13px; color: #ffffff; font-weight: 600;">Domaine</th>
              <th style="padding: 12px 14px; text-align: center; font-size: 13px; color: #ffffff; font-weight: 600;">Score</th>
              <th style="padding: 12px 14px; text-align: left; font-size: 13px; color: #ffffff; font-weight: 600;">Niveau</th>
            </tr>
          </thead>
          <tbody>
            ${stetauscopeRows}
          </tbody>
        </table>

        <div style="margin-top: 12px; padding: 12px 14px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #2563eb;">
          <p style="font-size: 12px; color: #1e40af; margin: 0; line-height: 1.5;">
            <strong>Interprétation :</strong> Plus le score par dimension est faible et donc proche de 0, plus il est favorable. Inversement, lorsque ce score est élevé, il est symptomatique d'un déséquilibre médico-professionnel actuel.
          </p>
        </div>
      </div>

      ${sportRecommendation}

      <!-- ── AIRE ────────────────────────────────── -->
      ${
        data.aireData.length > 0
          ? `
      <div style="margin-bottom: 32px;">
        <h2 style="font-size: 18px; color: #1e3a5f; border-bottom: 3px solid #2563eb; padding-bottom: 8px; margin: 0 0 6px;">
          2. Questionnaire AIRE
        </h2>
        <p style="font-size: 13px; color: #6b7280; line-height: 1.6; margin: 0 0 16px;">
          Ce tableau présente le rapport entretenu à votre travail par l'évaluation des 4 dimensions : Attentes, Investissement, Renforcements et Efficacité. L'équilibre entre les variables représente un rapport équilibré à son travail.
        </p>

        <table style="width: 100%; border-collapse: collapse; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #0d196d;">
              <th style="padding: 12px 14px; text-align: left; font-size: 13px; color: #ffffff; font-weight: 600;">Dimension</th>
              <th style="padding: 12px 14px; text-align: center; font-size: 13px; color: #ffffff; font-weight: 600;">Score</th>
              <th style="padding: 12px 14px; text-align: left; font-size: 13px; color: #ffffff; font-weight: 600;">Max</th>
            </tr>
          </thead>
          <tbody>
            ${aireRows}
          </tbody>
        </table>

        <div style="margin-top: 12px; padding: 12px 14px; background-color: #f0f9ff; border-radius: 8px; border-left: 4px solid #0d196d;">
          <p style="font-size: 12px; color: #1e1b4b; margin: 0; line-height: 1.5;">
            <strong>Interprétation :</strong> Un rapport équilibré au travail se traduit par des scores globalement réguliers et de valeur moyenne. Un déséquilibre marqué entre les dimensions peut indiquer une situation de souffrance au travail.
          </p>
        </div>
      </div>`
          : ""
      }

      <!-- ── Conclusion ──────────────────────────── -->
      <div style="margin-top: 24px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
        <h3 style="font-size: 15px; color: #1e3a5f; margin: 0 0 10px;">Besoin d'accompagnement ?</h3>
        <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
          Au-delà de ces outils réflexifs, notre priorité est de pouvoir vous accompagner si vous le jugez utile. Nous accompagnons dans la plus stricte confidentialité et indépendance, médecins et professionnels de santé.
        </p>
        <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0 0 8px;">
          Plus d'informations sur le site de l'Association MOTS : <a href="https://www.association-mots.org" style="color: #2563eb;">www.association-mots.org</a>
        </p>
        <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
          Pour toute demande d'accompagnement : <strong>06 08 282 589</strong>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 20px 24px; text-align: center;">
      <p style="font-size: 11px; color: #9ca3af; line-height: 1.5; margin: 0 0 8px;">
        Cet email contient des données personnelles et de santé. Ne le communiquez en aucun cas à un tiers.
      </p>
      <p style="font-size: 11px; color: #9ca3af; line-height: 1.5; margin: 0 0 8px;">
        Aucun résultat individuel ne peut être transmis par MOTS à quiconque, seuls des résultats
        <strong>collectifs garantissant la confidentialité</strong> peuvent être partagés.
      </p>
      <p style="font-size: 11px; color: #d1d5db; margin: 0;">
        © ${currentDate.getFullYear()} Association MOTS — L'équipe médicale MOTS
      </p>
    </div>

  </div>
</body>
</html>`;
}
