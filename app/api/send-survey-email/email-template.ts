// ── HTML email template for survey creation notification ──────────────────────

export interface SurveyEmailData {
  structureName: string;
  surveyName: string;
  surveyType: string;
  startDate: string;
  expirationDate: string;
  maxResponses: number | null;
  surveyLink: string;
}

const surveyTypeLabels: Record<string, string> = {
  AIRE: "AIRE",
  MOTS: "MOTS",
  AIRE_ET_MOTS: "AIRE & MOTS",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

export function buildSurveyCreatedEmailHtml(data: SurveyEmailData): string {
  const logoUrl = "https://oasis-nextjs.vercel.app/logo_OASIS.png";
  const typeLabel = surveyTypeLabels[data.surveyType] || data.surveyType;

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle enquête OASIS</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; padding: 24px 16px;">

    <!-- Header with logo -->
    <div style="background-color: #ffffff; border-radius: 12px 12px 0 0; padding: 24px; border-bottom: 1px solid #e2e8f0;">
      <img src="${logoUrl}" alt="MOTS OASIS" style="height: 60px; width: auto;" />
    </div>

    <!-- Main Card -->
    <div style="background-color: #ffffff; border-radius: 0 0 12px 12px; padding: 32px 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Bonjour,
      </p>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Une nouvelle enquête a été créée pour votre compte <strong>${data.structureName}</strong>.
        Vous trouverez ci-dessous les détails de cette enquête ainsi que le lien à transmettre aux participants.
      </p>

      <!-- Survey details -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
        <h2 style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 16px;">
          Détails de l'enquête
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #6b7280; width: 180px;">Nom :</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500;">${data.surveyName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Type de questionnaire :</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500;">${typeLabel}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Date de démarrage :</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500;">${formatDate(data.startDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Date d'expiration :</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500;">${formatDate(data.expirationDate)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-size: 14px; color: #6b7280;">Nombre max de réponses :</td>
            <td style="padding: 8px 0; font-size: 14px; color: #111827; font-weight: 500;">${data.maxResponses ?? "Illimité"}</td>
          </tr>
        </table>
      </div>

      <!-- Survey link -->
      <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 14px; color: #1e40af; margin: 0 0 12px; font-weight: 500;">
          Lien de l'enquête à transmettre aux participants :
        </p>
        <a href="${data.surveyLink}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 15px; font-weight: 600;">
          Accéder à l'enquête
        </a>
        <p style="font-size: 13px; color: #6b7280; margin: 12px 0 0; word-break: break-all;">
          ${data.surveyLink}
        </p>
      </div>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Vous pouvez copier ce lien et le transmettre directement aux participants afin qu'ils puissent répondre au questionnaire.
      </p>

      <p style="font-size: 15px; color: #374151; line-height: 1.6; margin: 0 0 16px;">
        Cordialement,<br/>
        L'équipe MOTS OASIS
      </p>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px 16px;">
      <p style="font-size: 12px; color: #9ca3af; margin: 0;">
        Cet email a été envoyé automatiquement par la plateforme MOTS OASIS.
      </p>
    </div>

  </div>
</body>
</html>
`;
}
