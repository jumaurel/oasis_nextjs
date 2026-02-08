// ── HTML email template for OASIS results ────────────────────────────────────

interface EmailData {
  fullname?: string;
  hasAttestation: boolean;
}

export function buildResultsEmailHtml(data: EmailData): string {
  const greeting = data.fullname ? `Bonjour ${data.fullname},` : "Bonjour,";

  const attachmentText = data.hasAttestation
    ? "Vous trouverez ci-joint :<br/>- vos résultats détaillés en pièce jointe (PDF),<br/>- une attestation de passation nominative (PDF)."
    : "Vous trouverez ci-joint vos résultats détaillés en pièce jointe (PDF).";

  const currentDate = new Date();

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

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        ${greeting}
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Vous avez complété la totalité des 2 auto-questionnaires Stet'auscope et AIRE.
      </p>
      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 24px;">
        ${attachmentText}
      </p>

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
